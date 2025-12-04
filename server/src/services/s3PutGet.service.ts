import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";
import { FileStructure } from "../entities/fileStructure.entity";
import AppDataSource from "../config/db.config";
import { Project } from "../entities/project.entity";

const fileStructureRepo = AppDataSource.getRepository(FileStructure);

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY!
  }
});

const s3UploadDefaultFiles = async (project: Project) => {
  const localPath = path.join(__dirname, "../../../my-react-app")
  const remotePath = project.id;
  // uploadToS3(localPath, remotePath);
  uploadContentInDb(localPath, remotePath, project)
}

const uploadToS3 = async (localPath: string, remotePath: string): Promise<void> => {
  fs.readdir(localPath, async (error, contents) => {
    if (error) throw error;
    if (!contents || contents.length === 0) return;

    for (const content of contents) {
      const contentPath = path.join(localPath, content);
      const stat = fs.lstatSync(contentPath);

      if (stat.isDirectory()) {
        await uploadToS3(contentPath, `${remotePath}/${content}`);
      } else {
        const fileBuffer = fs.readFileSync(contentPath);

        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${remotePath}/${content}`,
            Body: fileBuffer,
          })
        );
      }
    }
  });
};


const uploadContentInDb = async (localPath: string, remotePath: string, project: Project) => {
  fs.readdir(localPath, async (error, contents) => {
    if (error) throw error;
    if (!contents || contents.length === 0) return;

    for (const content of contents) {
      const contentPath = path.join(localPath, content);
      const stat = fs.lstatSync(contentPath);

      if (stat.isDirectory()) {
        await uploadContentInDb(contentPath, `${remotePath}/${content}`, project);
      } else {
        const fileBuffer = fs.readFileSync(contentPath);
        const fileStructure = fileStructureRepo.create({
          path: `${remotePath}/${content}`,
          content: String(fileBuffer),
          project
        })
        await fileStructureRepo.save(fileStructure);
      }
    }
  });
}


const uploadSingleFile = async (remotePath: string, content: any) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: remotePath,
      Body: content
    }));
}

export const uploadSingleFileDb = async (project: Project, path: string, content: string) => {
  const prevFileStructure = await fileStructureRepo.findOne({ where: { path }});
  if(prevFileStructure){
    prevFileStructure.content = content
    fileStructureRepo.save(prevFileStructure);
    return
  }
  const fileStructure = fileStructureRepo.create({
    project,
    path,
    content
  });

  await fileStructureRepo.save(fileStructure);
}

const s3GetObject = async (filePath: string) => {
    const fileStructure = await fileStructureRepo.findOne({
    where: {
      path: filePath
    }
  })

  return fileStructure?.content;
  // const response = await s3Client.send(
  //   new GetObjectCommand({
  //     Bucket: process.env.AWS_BUCKET_NAME!,
  //     Key: filePath,
  //   }),
  // );

  // if (!response.Body) {
  //   throw new Error("No response body received from S3");
  // }
  // const content = await response.Body.transformToString()
  // return content;
}

const s3GetFileStructure = async (projectId: string) => {
  const fileStructure = await fileStructureRepo.find({
    where: {
      project: {
        id: projectId
      }
    }
  })

  const arrFilePath = fileStructure.map((file) => file.path)
  return arrFilePath;
  // try {
  //   const response = await s3Client.send(
  //     new ListObjectsV2Command({
  //       Bucket: process.env.AWS_BUCKET_NAME!,
  //       Prefix: `${projectId}/`
  //     }),
  //   );

  //   if (!response || !response.Contents) {
  //     throw new Error("Error featching file structure")
  //   }
  //   return response.Contents

  // } catch (err) {
  //   err;
  // }

}

export { s3UploadDefaultFiles, s3GetObject, s3GetFileStructure, uploadSingleFile };
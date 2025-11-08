import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import defaultFileStructure from "../utils/defaultFileStructure";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY!
  }
});

const s3UploadDefaultFiles = async (projectId: string) => {
  const localPath = path.join(__dirname, "../../../my-react-app")
  const remotePath = projectId;
  uploadToS3(localPath, remotePath);
}

// const uploadToS3 = async (localPath: string, remotePath: string) => {
//     const contents = await fs.promises.readdir(localPath);

//     if (!contents || contents.length === 0) return;

//     for (const content of contents) {
//         const contentPath = path.join(localPath, content);
//         if (fs.lstatSync(contentPath).isDirectory()) {
//             await uploadToS3(path.join(contentPath), `${remotePath}/${content}`)
//         } else {
//             fs.readFile(contentPath, async (error, fileContent) => {
//                 await s3Client.send(new PutObjectCommand({
//                     Bucket: process.env.AWS_BUCKET_NAME!,
//                     Key: `${remotePath}/${content}`,
//                     Body: fileContent
//                 }));
//             })
//         }
//     }
// };


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


const uploadSingleFile = async (remotePath: string, content: any) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: remotePath,
      Body: content
    }));
}

const s3GetObject = async (filePath: string) => {
  const response = await s3Client.send(
    new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: filePath,
    }),
  );

  if (!response.Body) {
    throw new Error("No response body received from S3");
  }

  const content = await response.Body.transformToString()
  console.log(content, 's2get object');
  return content;
}

const s3GetFileStructure = async (projectId: string) => {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Prefix: `${projectId}/`
      }),
    );

    if (!response || !response.Contents) {
      throw new Error("Error featching file structure")
    }

    if (response.Contents?.length < 13) {
      return defaultFileStructure;
    }

    return response.Contents

  } catch (err) {
    return err;
  }

}

export { s3UploadDefaultFiles, s3GetObject, s3GetFileStructure, uploadSingleFile };
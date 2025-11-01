import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACESS_KEY!
    }
});

const s3PutObject = (projectId: string) => {
    const localPath = path.join(__dirname, "../../../my-react-app")
    const remotePath = projectId;
    uploadToS3(localPath, remotePath);
}

const uploadToS3 = (localPath: string, remotePath: string) => {
    fs.readdir(localPath, async (error, contents) => {
        console.log(contents, path.join(__dirname, "../../../my-react-app"));
        if (error) throw error;
        if (!contents || contents.length === 0) return;

        for (const content of contents) {
            const contentPath = path.join(localPath, content);
            if (fs.lstatSync(contentPath).isDirectory()) {
                uploadToS3(path.join(contentPath), `${remotePath}/${content}`)
            } else {
                fs.readFile(contentPath, async (error, fileContent) => {
                    await s3Client.send(new PutObjectCommand({
                        Bucket: process.env.AWS_BUCKET_NAME!,
                        Key: `${remotePath}/${content}`,
                        Body: fileContent
                    }));
                })
            }
        }
    })
};

const uploadSingleFile = async (remotePath: string, content: any) => {
    await s3Client.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: remotePath,
            Body: content
        }));
}

const s3GetObject = async (projectId: string) => {
    const response = await s3Client.send(
        new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `${projectId}`,
        }),
    );
    console.log(response, '...............');

}

const s3ListObject = async (projectId: string) => {
    // const url = getObjectUrl
    const response = await s3Client.send(
        new ListObjectsV2Command({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Prefix: `${projectId}/`
        }),
    );
    console.log(response, '...............');

}

export { s3PutObject, s3GetObject, s3ListObject, uploadSingleFile };
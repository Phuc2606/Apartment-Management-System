import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const endpoint = (process.env.MINIO_ENDPOINT || "http://localhost:9000").replace(/\/$/, "");

const s3 = new S3Client({
  endpoint: endpoint,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true,
});

export const uploadFile = async (file, key) => {
  const bucket = process.env.MINIO_BUCKET || "avatars";
  const publicUrl = (process.env.MINIO_PUBLIC_URL || endpoint).replace(/\/$/, "");
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ACL: "public-read",
    })
  );

  const avatarUrl = `${publicUrl}/${bucket}/${key}`;

  return avatarUrl;
};
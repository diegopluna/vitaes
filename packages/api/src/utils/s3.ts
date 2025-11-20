import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const minioEndpoint = process.env.MINIO_ENDPOINT
const minioPublicEndpoint = process.env.MINIO_PUBLIC_ENDPOINT
const minioAccessKey = process.env.MINIO_ACCESS_KEY
const minioSecretKey = process.env.MINIO_SECRET_KEY
const minioBucket = process.env.MINIO_BUCKET

if (
  !minioEndpoint ||
  !minioPublicEndpoint ||
  !minioAccessKey ||
  !minioSecretKey ||
  !minioBucket
) {
  throw new Error(
    'Missing MinIO configuration. Please set MINIO_ENDPOINT, MINIO_PUBLIC_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, and MINIO_BUCKET environment variables.',
  )
}

export const s3Client = new S3Client({
  endpoint: minioEndpoint,
  region: 'us-east-1', // MinIO doesn't care about region, but SDK requires it
  credentials: {
    accessKeyId: minioAccessKey,
    secretAccessKey: minioSecretKey,
  },
  forcePathStyle: true, // Required for MinIO
})

export async function uploadThumbnail(
  resumeId: string,
  thumbnailBuffer: Buffer,
): Promise<string> {
  const key = `thumbnails/${resumeId}.jpg`

  const command = new PutObjectCommand({
    Bucket: minioBucket,
    Key: key,
    Body: thumbnailBuffer,
    ContentType: 'image/jpeg',
  })

  await s3Client.send(command)

  // Return the URL to access the thumbnail
  // Assuming MinIO is accessible at the endpoint
  return `${minioPublicEndpoint}/${minioBucket}/${key}`
}

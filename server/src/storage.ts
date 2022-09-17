// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage'
import { format } from 'util'

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html

// Creates a client using Application Default Credentials
const storage = new Storage()

// The ID of your GCS bucket
const bucketName = 'steph-ridnell-ass-1.appspot.com'
const bucket = storage.bucket(bucketName)

export const uploadFile = async (file: Express.Multer.File, prefix: string): Promise<string | void> => {
  // Create a new blob in the bucket and upload the file data.
  // (adding prefix to filename as a budget way to avoid duplicates)
  const blob = bucket.file(prefix + '_' + file.originalname)
  const blobStream = blob.createWriteStream()
  blobStream.end(file.buffer)

  try {
    await new Promise((resolve, reject) => {
      blobStream.on('finish', resolve)
      blobStream.on('error', reject)
    })
    await blob.makePublic()
    return format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
  } catch (err) {
    return undefined
  }
}

const deleteFile = async (fileName: string) => {
  await storage.bucket(bucketName).file(fileName).delete();
}

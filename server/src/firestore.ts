// Imports the Google Cloud client library
import { Firestore } from "@google-cloud/firestore"

// Creates a client
const firestore: Firestore = new Firestore()
firestore.settings({ ignoreUndefinedProperties: true })

export const storeEntity = async (
  kind: string,
  id: string,
  data: Record<string, any>
) => {
  const collection = firestore.collection(kind)
  const doc = collection.doc(id)
  await doc.set(data)
}

export const getEntityById = async (
  kind: string,
  id: string
): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const document = await firestore.collection(kind).doc(id).get()
  if (!document.exists) {
    return undefined
  } else {
    return document.data()
  }
}

// simple getter that gets a single entity by a single key and value
export const getEntity = async (
  kind: string,
  field: string,
  value: string
): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const document = await (
    await firestore.collection(kind).where(field, "==", value).limit(1).get()
  ).docs
  if (!document[0] || !document[0].exists) {
    return undefined
  } else {
    return document[0].data()
  }
}

export const getLoginUser = async (
  id: string,
  password: string
): Promise<FirebaseFirestore.DocumentData | undefined> => {
  const document = await firestore.collection('user').doc(id).get()
  if (!document.exists) {
    return undefined
  } else {
    const docData = document.data()
    if (!docData || docData.password !== password) {
      return undefined
    }
    return docData
  }
}

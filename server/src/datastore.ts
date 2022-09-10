// Imports the Google Cloud client library
import { Datastore } from "@google-cloud/datastore";
import { GetResponse } from "@google-cloud/datastore/build/src/request";

// Creates a client
const datastore: Datastore = new Datastore();

export const storeEntity = async (kind: string, id: string, data: Record<string, any>) => {
  // The Cloud Datastore key for the new entity
  const key = datastore.key([kind, id]);

  // Prepares the new entity
  const newEntity = { key, data };

  // Saves the entity
  await datastore.save(newEntity);
};

export const getEntityById = async (kind: string, id: string): Promise<GetResponse> => {
  const key = datastore.key([kind, id]);
  const entity = await datastore.get(key)
  return entity[0]
}
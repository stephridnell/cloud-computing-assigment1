// Imports the Google Cloud client library
import { Datastore } from "@google-cloud/datastore";

// Creates a client
const datastore: Datastore = new Datastore();

export const storeEntity = async (kind: string, id: string, data: Record<string, any>) => {
  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, id]);

  // Prepares the new entity
  const newEntity = {
    key: taskKey,
    data,
  };

  // Saves the entity
  await datastore.save(newEntity);
};

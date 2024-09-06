//indexedDB setup
import Dexie from "dexie";

//stores data that is synced to remote
export const db = new Dexie("NestEgg");

db.version(1).stores({
    synced: "&id, goals, startDate, endDate, targetAmount",
    unSynced: "++id, goals, startDate, endDate, targetAmount",
});
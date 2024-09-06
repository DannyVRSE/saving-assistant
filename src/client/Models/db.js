//indexedDB local databse setup

import Dexie from "dexie";

export const db = new Dexie("NestEgg");

//synced store will hold plans that are synced with the remote database
//unSynced store will hold plans that are not synced with the remote database
db.version(1).stores({
    synced: "&id, goals, startDate, endDate, targetAmount",
    unSynced: "++id, goals, startDate, endDate, targetAmount",
});
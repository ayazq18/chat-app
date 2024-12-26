import { openDB } from "idb";

const dbPromise = openDB("messaging-app", 1, {
  upgrade(db) {
    db.createObjectStore("contacts", { keyPath: "id" });
    db.createObjectStore("messages", { keyPath: "id" });
  },
});

export const saveContactsToLocal = async (contacts) => {
  const db = await dbPromise;
  const tx = db.transaction("contacts", "readwrite");
  contacts.forEach((contact) => tx.store.put(contact));
  await tx.done;
};

export const getContactsFromLocal = async () => {
  const db = await dbPromise;
  return db.getAll("contacts");
};

export const saveMessagesToLocal = async (messages) => {
  const db = await dbPromise;
  const tx = db.transaction("messages", "readwrite");
  messages.forEach((message) => tx.store.put(message));
  await tx.done;
};

export const getMessagesFromLocal = async (contactId) => {
  const db = await dbPromise;
  return db.getAllFromIndex("messages", "contactId", contactId);
};

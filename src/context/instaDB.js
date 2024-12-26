import { init, id } from '@instantdb/react';

// Connect to the database
// ---------
export const db = init({
  appId: "99cdf819-7e0b-49df-9a40-730c8c4056c1",
});

export function addMessage(text) {
  db.transact(
    db.tx.messages[id()].update({
      text,
      createdAt: new Date(),
    }),
  );
}

// transact! 🔥

export function UserLogin(email, password) {
  db.transact(db.tx.userLogin[id()].update({ email, password, createdAt: new Date() }));
    // Store the user details in localStorage
    const userDetails = email;  // Add any additional details you need to store
    localStorage.setItem("loggedInUser", userDetails);
}

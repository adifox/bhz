import admin from "firebase-admin";
import credentials from "../config.json";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });
}

// Get a reference to the Firestore database
const db = admin.firestore();

// Example: Add a new document to a collection
async function addDocument(userData) {
  try {
    const docRef = await db.collection("users").add(userData);

    return { userId: docRef.id, status: 200 };
  } catch (error) {
    console.error("Error adding document:", error);
    return error;
  }
}

async function checkForUser(mail) {
  try {
    const emailQuerySnapshot = await db
      .collection("users")
      .where("email", "==", mail)
      .get();

    // Check if any document exists with the given email
    if (!emailQuerySnapshot.empty) {
      console.log("User exists with this email.");
      return true;
    }

    return false;
  } catch (error) {
    console.error("DB query error:", error);
  }
}

async function getDocumentById(docId) {
  try {
    const doc = await db.collection("users").doc(docId).get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

async function updateDocumentById(docId, data) {
  try {
    await db.collection("users").doc(docId).update(data);
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

async function deleteDocumentById(docId) {
  try {
    await db.collection("users").doc(docId).delete();
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

export {
  addDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
  checkForUser,
};

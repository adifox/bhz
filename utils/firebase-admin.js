import admin from "firebase-admin";
import credentials from "../buenos-humos-zaragoza-firebase-adminsdk-vchyb-4ce2a4601d.json";

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Example: Add a new document to a collection
async function addDocument(userData) {
  try {
    const docRef = await db.collection("users").add(userData);
    console.log("THE RESPONSE:", docRef);
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

// Example: Get a document by ID
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

// Example: Update a document by ID
async function updateDocumentById(docId, data) {
  try {
    await db.collection("users").doc(docId).update(data);
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

// Example: Delete a document by ID
async function deleteDocumentById(docId) {
  try {
    await db.collection("users").doc(docId).delete();
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

export { addDocument, getDocumentById, updateDocumentById, deleteDocumentById };
// Run the functions
// addDocument();
// getDocumentById('your-doc-id');
// updateDocumentById('your-doc-id', { age: 35 });
// deleteDocumentById('your-doc-id');

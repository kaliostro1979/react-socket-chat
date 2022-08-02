const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const {getFirestore} = require("firebase-admin/firestore");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

module.exports = db


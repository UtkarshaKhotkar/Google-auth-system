const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load service account and initialize Admin SDK exactly once
const serviceAccount = require("./backend/serviceAccountKey.json");
if (!admin.apps || admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const app = express();
app.use(cors({ origin: "http://localhost:3000" })); // restrict to your frontend origin
app.use(bodyParser.json());
app.post("/sessionLogin", async (req, res) => {
  try {
    const idToken = req.body.idToken;
    if (!idToken) return res.status(400).json({ error: "Missing idToken" });
    const decodedToken = await admin.auth().verifyIdToken(idToken);
  
    return res.json({ success: true, decodedToken });
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Server listening on", PORT));

// (initialization done above)

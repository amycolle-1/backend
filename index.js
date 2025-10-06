const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { creerUtilisateur, listerUtilisateurs, modifierUtilisateur, supprimerUtilisateur, bloquerUtilisateur, debloquerUtilisateur, deconnecter } = require("./controllers/utilisateurController");
const { effectuerDepot } = require("./controllers/transactionController");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bank";
mongoose.connect(MONGODB_URI).then(()=>{
    console.log("Connecté à MongoDB");
}).catch(err =>console.error("Erreur de connexion MongoDB", err))

const app = express();
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({
  origin: CORS_ORIGIN
}));
app.use(express.json());

app.post("/api/users", creerUtilisateur);
app.get("/api/users", listerUtilisateurs);
app.put("/api/users/:id", modifierUtilisateur);
app.delete("/api/users/:id", supprimerUtilisateur);
app.patch("/api/users/:id/bloquer", bloquerUtilisateur);
app.patch("/api/users/:id/debloquer", debloquerUtilisateur);
app.post("/api/deconnecter", deconnecter);
app.post("/api/depot", effectuerDepot);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

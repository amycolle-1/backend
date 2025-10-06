const mongoose = require("mongoose");

const HistoriqueSchema = new mongoose.Schema({
  typeOperation: { type: String, enum: ["depot", "retrait", "annulation"], required: true },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  montant: { type: Number, required: true },
  agent: { type: String, required: true },
  statut: { type: String, enum: ["reussi", "echoue", "annule"], default: "reussi" },
  referenceOperation: { type: String } // ex: ID du dépôt, retrait, etc.
}, { timestamps: true });

module.exports = mongoose.model("Historique", HistoriqueSchema);

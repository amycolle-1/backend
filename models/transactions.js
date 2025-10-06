// models/Depot.js
const mongoose = require("mongoose");

const DepotSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  montant: { type: Number, required: true },
  agent: { type: String, required: true }, // ou référence à un Agent si tu en as un
  status: { type: String, enum: ["reussi", "annule"], default: "reussi" }
}, { timestamps: true });

module.exports = mongoose.model("Depot", DepotSchema);

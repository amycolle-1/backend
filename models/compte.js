const mongoose = require("mongoose");

const CompteSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  numeroCompte: { type: String, unique: true, required: true },
  type: { type: String, enum: ["courant", "epargne"], default: "courant" },
  solde: { type: Number, default: 0 },
  statut: { type: String, enum: ["actif", "bloque"], default: "actif" }
}, { timestamps: true });

module.exports = mongoose.model("Compte", CompteSchema);

// models/Utilisateur.js
const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, unique: true },
  telephone: { type: String, required: true },
  type: { type: String, enum: ["client", "distributeur"], required: true },
  numeroCompte: { type: String, unique: true },
  statut: { type: String, enum: ["actif", "suspendu"], default: "actif" },
  solde: { type: Number, default: 0 }
}, { timestamps: true });

// Auto-generation du numeroCompte: ACxxxxx pour client, ADxxxxx pour distributeur
UtilisateurSchema.pre("save", function(next) {
  if (this.numeroCompte) return next();
  const prefix = this.type === "distributeur" ? "AD" : "AC"; // défaut: client
  const random = Math.floor(10000 + Math.random() * 90000); // 5 chiffres
  this.numeroCompte = `${prefix}${random}`;
  next();
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);

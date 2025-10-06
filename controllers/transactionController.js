const Utilisateur = require("../models/utilisateurs.js");
const Depot = require("../models/transactions.js");

// POST /api/depot
// body: { numeroCompte: string, montant: number, agent?: string }
exports.effectuerDepot = async (req, res) => {
  try {
    const { numeroCompte, montant, agent } = req.body || {};
    if (!numeroCompte || typeof numeroCompte !== 'string') {
      return res.status(400).json({ error: "numeroCompte requis" });
    }
    const m = Number(montant);
    if (!m || m <= 0) {
      return res.status(400).json({ error: "montant invalide" });
    }

    const user = await Utilisateur.findOne({ numeroCompte });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable pour ce numeroCompte" });
    }

    user.solde = Number(user.solde || 0) + m;
    await user.save();

    const depot = await Depot.create({
      utilisateur: user._id,
      montant: m,
      agent: agent || "agent",
      status: "reussi"
    });

    return res.status(201).json({
      message: "Dépôt réussi",
      utilisateur: user,
      depot,
      transactionId: depot?._id?.toString()
    });
  } catch (err) {
    console.error("Erreur dépôt:", err);
    return res.status(500).json({ error: err.message });
  }
};

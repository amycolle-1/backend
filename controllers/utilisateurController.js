const Utilisateur = require("../models/utilisateurs.js");
  
  exports.creerUtilisateur = async (req, res) => {
    try {
      const user = await Utilisateur.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.listerUtilisateurs = async (req, res) => {
    try {
      const users = await Utilisateur.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.modifierUtilisateur = async (req, res) => {
    try {
      const user = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.supprimerUtilisateur = async (req, res) => {
    try {
      await Utilisateur.findByIdAndDelete(req.params.id);
      res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.bloquerUtilisateur = async (req, res) => {
    try {
      const user = await Utilisateur.findByIdAndUpdate(req.params.id, { statut: "suspendu" }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.debloquerUtilisateur = async (req, res) => {
    try {
      const user = await Utilisateur.findByIdAndUpdate(req.params.id, { statut: "actif" }, { new: true });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deconnecter = (req, res) => {
    res.json({ message: "Déconnexion réussie" });
  };

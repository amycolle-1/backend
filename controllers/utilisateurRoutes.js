const express = require("express");
const {
  creerUtilisateur,
  listerUtilisateurs,
  modifierUtilisateur,
  supprimerUtilisateur,
  bloquerUtilisateur,
  deconnecter
} = require("../controllers/utilisateurController");

const router = express.Router();

router.post("/", creerUtilisateur);
router.get("/", listerUtilisateurs);
router.put("/:id", modifierUtilisateur);
router.delete("/:id", supprimerUtilisateur);
router.patch("/:id/bloquer", bloquerUtilisateur);
router.post("/deconnecter", deconnecter);

module.exports = router;

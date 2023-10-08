const express = require("express");
const router = express.Router();
const contributorController = require("../controllers/contributors");

router.get(
  "/recommend/:project_id",
  contributorController.recommendContributors
);
router.post("/", contributorController.createContributor); // sign up
router.get("/:user_id", contributorController.getContributor);
router.put("/:user_id", contributorController.updateContributor);
router.post("/favorite", contributorController.favoriteProject);
router.post("/unfavorite", contributorController.unfavoriteProject);
router.post("/login", contributorController.getContributorByEmail);

module.exports = router;

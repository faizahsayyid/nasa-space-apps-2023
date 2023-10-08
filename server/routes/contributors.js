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
router.post("/:user_id/favorite", contributorController.favoriteProject);
router.post("/:user_id/unfavorite", contributorController.unfavoriteProject);
router.post("/login", contributorController.getContributorByEmail);

module.exports = router;

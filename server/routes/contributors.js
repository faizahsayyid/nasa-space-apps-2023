const express = require("express");
const router = express.Router();
const contributorController = require("../controllers/contributors");

router.get(
  "/recommend/:project_id",
  contributorController.recommendContributors
);
router.post("/", contributorController.createContributor);

module.exports = router;

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects");

router.get("/", projectController.queryProjects);
router.post("/", projectController.createProject);
router.get("/:project_id", projectController.getProject);
router.put("/:project_id", projectController.updateProject);
router.post("/:project_id/apply", projectController.applyToProject);

module.exports = router;

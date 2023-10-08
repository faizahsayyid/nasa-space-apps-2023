const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projects");

router.get("/", projectController.queryProjects);
router.post("/", projectController.createProject);

module.exports = router;

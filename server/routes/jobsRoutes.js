const express = require("express");
const authenticateUser = require("../middleware/auth.js");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} = require("../controllers/jobsController.js");

router.route("/").post(createJob).get(getAllJobs);
// remember about :id
router.route("/stats").get(authenticateUser, showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = router;

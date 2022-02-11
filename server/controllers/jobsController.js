const Job = require("../models/Job");
const StatusCodes = require("http-status-codes");

module.exports.createJob = async function (req, res) {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new Error("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
module.exports.getAllJobs = async function (req, res) {
  res.send("get all jobs");
};
module.exports.deleteJob = async function (req, res) {
  res.send("delete job");
};
module.exports.updateJob = async function (req, res) {
  res.send("update job");
};
module.exports.showStats = async function (req, res) {
  res.send("show stats");
};

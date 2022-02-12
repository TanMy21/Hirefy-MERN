const Job = require("../models/Job");
const StatusCodes = require("http-status-codes");
const checkPermissions = require('../utils/checkPermissions.js')

module.exports.createJob = async function (req, res) {
  const { position, company } = req.body;

  if (!position || !company) {
    throw new Error("Please Provide All Values");
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  res.status(201).json({ job });
};



module.exports.getAllJobs = async function (req, res) {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res
    .status(201)
    .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};




module.exports.deleteJob = async function (req, res) {
  const { id: jobId } = req.params

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new Error(`No job with id : ${jobId}`)
  }

  checkPermissions(req.user, job.createdBy)

  await job.remove()
  res.status(201).json({ msg: 'Success! Job removed' })
};




module.exports.updateJob = async function (req, res) {
  const { id: jobId } = req.params

  const { company, position } = req.body

  if (!company || !position) {
    throw new Error('Please Provide All Values')
  }

  const job = await Job.findOne({ _id: jobId })

  if (!job) {
    throw new Error(`No job with id ${jobId}`)
  }

  // check permissions

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(201).json({ updatedJob })
};



module.exports.showStats = async function (req, res) {
  res.send("show stats");
};

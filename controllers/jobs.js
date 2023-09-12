const User = require("../models/User");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllJobs = async (req, res) => {
  const job = Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ job });
};

const getJob = async (req, res) => {
  const job = Job.findOne({ _id: req.params.id, createdBy: req.user.userId });
  if (!job) {
    throw new BadRequestError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const job = Job.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const job = Job.updateOne(
    { _id: req.params.id, createdBy: req.user.userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
    if (!job) {
        throw new BadRequestError("Job not found or user not authorized");
    }
    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async(req,res)=>{
    const job = Job.findOneAndDelete({_id:req.params.id, createdBy: req.user.userId})
    if(!job){
        throw new BadRequestError('Job not found or user not authorized')
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
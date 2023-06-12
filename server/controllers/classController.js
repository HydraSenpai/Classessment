import Class from '../models/Class.js';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customAPIError.js';

const createClass = async (req, res) => {
  const { name, currentScore } = req.body;
  if (!name) {
    throw new CustomAPIError(
      'Please provide a class name',
      StatusCodes.BAD_REQUEST
    );
  }
  const classExists = await Class.findOne({
    createdBy: req.user.userId,
    name,
  });
  if (classExists) {
    throw new CustomAPIError(
      'This class name already exists',
      StatusCodes.BAD_REQUEST
    );
  }
  req.body.createdBy = req.user.userId;
  const classNew = await Class.create(req.body);
  res.status(StatusCodes.CREATED).json({ classNew });
};

const getAllClasses = async (req, res) => {
  const classes = await Class.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ classes, totalClasses: classes.length });
};

const getClass = async (req, res) => {
  const classSingle = await Class.findById(req.params.id);
  res.status(StatusCodes.OK).json({ classSingle });
};

const addStat = async (req, res) => {
  console.log(req.body);
  const targetClass = await Class.findById(req.params.id);
  if (!targetClass) {
    throw new CustomAPIError(
      `No job with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  let currentTests = targetClass.tests;
  if (!req.body.name || !req.body.score) {
    throw new CustomAPIError(`Please provide values`, StatusCodes.BAD_REQUEST);
  }
  if (
    req.body.score > 100 ||
    req.body.score < 0 ||
    req.body.weight > 100 ||
    req.body.weight < 0
  ) {
    throw new CustomAPIError(
      `Values out of 0-100 bounds`,
      StatusCodes.BAD_REQUEST
    );
  }
  currentTests.push({
    id: req.body.id,
    name: req.body.name,
    score: req.body.score,
    weight: req.body.weight,
  });
  console.log(currentTests);
  const updatedClass = await Class.findByIdAndUpdate(
    { _id: req.params.id },
    { tests: currentTests },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ updatedClass, numOfTestsData: updatedClass.tests.length });
};

const editStat = async (req, res) => {
  const targetClass = await Class.findById(req.params.id);
  if (!targetClass) {
    throw new CustomAPIError(
      `No class with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  let currentTests = targetClass.tests;
  if (!req.body.name || !req.body.score || !req.body.id) {
    throw new CustomAPIError(`Please provide values`, StatusCodes.BAD_REQUEST);
  }
  if (
    req.body.score > 100 ||
    req.body.score < 0 ||
    req.body.weight > 100 ||
    req.body.weight < 0
  ) {
    throw new CustomAPIError(
      `Values out of 0-100 bounds`,
      StatusCodes.BAD_REQUEST
    );
  }
  currentTests = currentTests.filter((test) => test.id !== req.body.id);
  if (req.body.method !== 'delete') {
    currentTests.push({
      id: req.body.id,
      name: req.body.name,
      score: req.body.score,
      weight: req.body.weight,
    });
  }
  console.log(currentTests);
  const updatedClass = await Class.findByIdAndUpdate(
    { _id: req.params.id },
    { tests: currentTests },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ updatedClass, numOfTestsData: updatedClass.tests.length });
};

const deleteClass = async (req, res) => {
  const deletedClass = await Class.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!deletedClass) {
    throw new CustomAPIError(
      `No job with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  console.log(deletedClass);
  res.status(StatusCodes.OK).json({ msg: 'Success! Job deleted' });
};

const updateClass = (req, res) => {
  res.send('update class');
};

export {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteClass,
  addStat,
  editStat,
};

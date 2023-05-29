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
  const targetClass = await Class.findById(req.params.id);
  if (!targetClass) {
    throw new CustomAPIError(
      `No job with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  const currentTests = targetClass.tests;
  console.log(currentTests);
  currentTests.push({ name: req.body.name, score: req.body.score });
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
};

import Class from '../models/Class.js';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customAPIError.js';

const createClass = async (req, res) => {
  const { name, currentScore } = req.body;
  if (!name) {
    throw CustomAPIError(
      'Please provide a class name',
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
  res.send('get one class');
};

const updateClass = async (req, res) => {
  res.send('update class');
};

const deleteClass = async (req, res) => {
  res.send('delete class');
};

export { createClass, getAllClasses, getClass, updateClass, deleteClass };

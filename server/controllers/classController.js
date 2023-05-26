import Class from '../models/Class.js';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/customAPIError.js';

const createClass = async (req, res) => {
  res.send('create class');
};

const getAllClasses = async (req, res) => {
  res.send('get all classes');
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

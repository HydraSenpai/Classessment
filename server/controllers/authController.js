import CustomAPIError from '../errors/customAPIError.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  //check if any fields are missing at server
  if (!name || !email || !password) {
    throw new CustomAPIError(
      'Please provide all values',
      StatusCodes.BAD_REQUEST
    );
  }
  //email has to be unique so check if email is already in database
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomAPIError(
      'This email is already in use',
      StatusCodes.BAD_REQUEST
    );
  }
  //submit user info to database
  const user = await User.create({ name, email, password });
  //const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  //check if any fields are missing at server
  if (!email || !password) {
    throw new CustomAPIError(
      'Please provide all values',
      StatusCodes.BAD_REQUEST
    );
  }
  //email has to be unique so check if email is already in database
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomAPIError(
      'This email is already in use',
      StatusCodes.BAD_REQUEST
    );
  }
  //submit user info to database
  const user = await User.create({ name, email, password });
  //const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      name: user.name,
    },
  });
};

const updateUser = async (req, res) => {
  res.send('update user');
};

export { login, updateUser, register };
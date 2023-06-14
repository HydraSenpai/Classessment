import CustomAPIError from '../errors/customAPIError.js';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

const register = async (req, res) => {
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
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      lastName: user.lastName,
      bio: user.bio,
      dob: user.dob,
      favoriteSubject: user.favoriteSubject,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomAPIError(
      'Please provide all values',
      StatusCodes.BAD_REQUEST
    );
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new CustomAPIError('Invalid Credentials', StatusCodes.UNAUTHORIZED);
  }
  const isPassword = await user.comparePassword(password);
  if (!isPassword) {
    throw new CustomAPIError('Invalid Credentials', StatusCodes.UNAUTHORIZED);
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { title, value, id } = req.body;
  if (!title || !value || !id) {
    throw new CustomAPIError(
      'Please provide all values',
      StatusCodes.BAD_REQUEST
    );
  }
  let user = await User.findById({ _id: id });
  if (!user) {
    throw new CustomAPIError('Invalid User', StatusCodes.UNAUTHORIZED);
  }
  const update = { [title]: value };
  const options = { new: true };
  user = await User.findByIdAndUpdate(id, update, options);
  res.status(StatusCodes.OK).json({ user });
};

export { login, updateUser, register };

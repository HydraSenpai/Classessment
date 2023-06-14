import mongoose from 'mongoose';
mongoose.set('debug', true);

const connectDB = (url) => {
  return mongoose.connect(url);
};

export default connectDB;

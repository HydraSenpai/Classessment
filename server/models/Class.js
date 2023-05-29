import mongoose from 'mongoose';
import validator from 'validator';

const ClassSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a class name'],
    maxLength: 100,
    trim: true,
  },
  currentScore: {
    type: Number,
  },
  tests: {
    type: Array,
    required: [true, 'Please provide empty test or test data'],
    default: [],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

export default mongoose.model('Class', ClassSchema);

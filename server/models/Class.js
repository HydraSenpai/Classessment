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
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
});

export default mongoose.model('Class', ClassSchema);

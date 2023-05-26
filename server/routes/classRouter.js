import {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteClass,
} from '../controllers/classController.js';
import auth from '../middleware/auth.js';

import express from 'express';
const router = express.Router();

router.route('/').post(createClass).get(getAllClasses);
//router.route('/stats').get(showStats);
router.route('/:id').delete(deleteClass).patch(updateClass).get(getClass);

export default router;

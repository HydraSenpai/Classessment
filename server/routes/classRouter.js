import {
  createClass,
  getAllClasses,
  getClass,
  updateClass,
  deleteClass,
  addStat,
} from '../controllers/classController.js';
import auth from '../middleware/auth.js';

import express from 'express';
const router = express.Router();

router.route('/').post(createClass).get(getAllClasses);
//router.route('/stats').get(showStats);
router.route('/:id').delete(deleteClass).patch(updateClass).get(getClass);
router.route('/stats/:id').patch(addStat);

export default router;

import express from 'express';
const router = express.Router();

import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController.js';

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').get(getTodo).patch(updateTodo).delete(deleteTodo);

export default router;

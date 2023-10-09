import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      // unique: true, ??
      // required: [true, 'A todo must have a content'],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;

import Todo from '../models/todoModel.js';

// @route GET /api/todos
// @desc Get all todos
// @access Public
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({
      status: 'success',
      results: todos.length,
      data: {
        todos: todos,
      },
      // data: todos,
    });
    // OR // return res.status(201).json(todos);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @route POST /api/todos
// @desc Create todo
// @access Public
const createTodo = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({
        status: 'fail',
        message: 'Field required',
      });
    }
    const newTodo = new Todo({
      task: req.body.task,
      completed: req.body.completed,
    });
    // const todo = await newTodo.save(); // calling  method on the new DOCUMENT
    // res.status(201).json(todo);

    // calling  method on the MODEL
    const todo = await Todo.create(newTodo);
    res.status(201).json({
      status: 'success',
      data: {
        todo: newTodo,
      },
    });
    // OR // return res.status(201).send(book);
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @route GET /api/todos/:id
// @desc Get todo by id
// @access Public
const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    // shorthand for this: const todo = await Todo.findOne({ _id: req.params.id });
    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        error: `No todo found with id ${req.params.id}`,
        // if castError ie id=1234 ie not correct format, this goes to catch block instead
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        todo: todo,
      },
    });
    // res.status(200).json(book);
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @route PATCH /api/todos/:id
// @desc Update todo by id
// @access Public
const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      // PATCH: only updates the fields specified in req.body
      // PUT: replaces the entire object with what is passed in req.body
      new: true, // option so that the new updated document is the one returned
      runValidators: true, // option so that model validator run again on updating
    });
    if (!updatedTodo) {
      return res.status(404).json({
        status: 'fail',
        error: `No todo found with id ${req.params.id}`,
        // if castError ie id=1234 ie not correct format, this goes to catch block instead
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        todo: updatedTodo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// @route DELETE /api/todos/:id
// @desc Delete todo
// @access Public
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        error: `No todo found with id ${req.params.id}`,
      });
    }
    res.status(200).json({
      status: 'success',
      data: null,
      message: `Todo ${req.params.id} deleted`,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo };

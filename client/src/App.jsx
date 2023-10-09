import { HiOutlinePencilAlt, HiOutlineTrash, HiCheck } from 'react-icons/hi';

import {
  getAllTodos,
  addTodo,
  editTodo,
  deleteTodo,
  toggleComplete,
} from './utils/apiTodos';

import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [todoId, setTodoId] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleEdit = (_id, editedTask) => {
    setIsEditing(true);
    // console.log(_id);
    setTodoId(_id);
    setTask(editedTask);
  };

  const handleDelete = (_id) => {
    // console.log(_id);
    setTodoId(_id);
    deleteTodo(_id, setTodos);
  };

  const handleToggleComplete = (_id, isCompleted) => {
    console.log(_id);
    setTodoId(_id);
    toggleComplete(_id, isCompleted, setIsCompleted, setTodos);
  };

  useEffect(() => {
    getAllTodos(setTodos);
  }, []);

  if (!todos) return <div>Nothing to do...</div>;

  return (
    <main className='app'>
      <h1>MERN todo list</h1>
      <div className='input'>
        <input
          type='text'
          placeholder='Add a todo...'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={
            isEditing
              ? () => editTodo(todoId, task, setTask, setIsEditing, setTodos)
              : () => addTodo(task, setTask, setTodos)
          }
        >
          {isEditing ? 'Save changes' : 'Add'}
        </button>
      </div>

      <ul className='todo-list'>
        {todos.map((todo) => (
          <li
            className={`todo-item ${
              todo.completed ? 'completed' : 'not-completed'
            }`}
            key={todo._id}
          >
            <div className='text'>{todo.task}</div>
            <div className='icons'>
              <HiCheck
                className='icon green'
                onClick={() => handleToggleComplete(todo._id, todo.completed)}
              />
              <HiOutlinePencilAlt
                className='icon'
                onClick={() => handleEdit(todo._id, todo.task)}
              />
              <HiOutlineTrash
                className='icon red'
                onClick={() => handleDelete(todo._id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;

import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAllTodos = (setTodos) => {
  axios.get(`${API_URL}/todos`).then((res) => {
    console.log('res.data.data.todos ', res.data.data.todos);
    setTodos(res.data.data.todos);
  });
};

const addTodo = (task, setTask, setTodos) => {
  axios
    .post(`${API_URL}/todos`, { task: task })
    .then((res) => {
      console.log('res.data ', res.data);
      setTask(''); // clear input field
      getAllTodos(setTodos); // display all todos
    })
    .catch((error) => console.log(error));
};

const editTodo = (todoId, task, setTask, setIsEditing, setTodos) => {
  axios
    .patch(`${API_URL}/todos/${todoId}`, { _id: todoId, task: task })
    .then((res) => {
      console.log('res.data ', res.data);
      console.log(`Todo id ${todoId} edited`);
      setTask('');
      setIsEditing(false);
      getAllTodos(setTodos);
    })
    .catch((error) => console.log(error));
};

const toggleComplete = (todoId, isCompleted, setIsCompleted, setTodos) => {
  axios
    .patch(`${API_URL}/todos/${todoId}`, {
      _id: todoId,
      completed: !isCompleted,
    })
    .then((res) => {
      console.log('res.data ', res.data);
      console.log('isCompleted ', isCompleted);
      console.log(`Todo id ${todoId}: completed ${!isCompleted}`);
      setIsCompleted((isCompleted) => !isCompleted);
      getAllTodos(setTodos);
    })
    .catch((error) => console.log(error));
};

const deleteTodo = (todoId, setTodos) => {
  axios
    .delete(`${API_URL}/todos/${todoId}`, { _id: todoId })
    .then((res) => {
      console.log('res.data ', res.data);
      console.log(`Todo id ${todoId} deleted`);
      getAllTodos(setTodos);
    })
    .catch((error) => console.log(error));
};

export { getAllTodos, addTodo, editTodo, deleteTodo, toggleComplete };

import axios from "axios";

export const getTodos = async () => {
  let res = await axios.get("http://localhost:3001/todos");
  let todos = res.data;
  return todos;
};

export const getSingleTodos = async (id) => {
  let res = await axios.get(`http://localhost:3001/todos/${id}`);
  let todos = res.data;
  return todos;
};

export const getCompletedTodos = async () => {
  let res = await axios.get("http://localhost:3001/todos", {
    params: {
      status: true,
    },
  });
  let todos = res.data;
  return todos;
};

export const addTodos = async (data) => {
  console.log(data);
  let res = await axios.post("http://localhost:3001/todos", {
    status: false,
    title: data.title,
    description: data.description,
    completion: data.completion,
    subtask: data.subtask.map((el, i) => {
      return {
        id1: i,
        status1: false,
        subtask1: el,
      };
    }),
    tag: data.tag,
  });
  let todos = res.data;
  return todos;
};

export const toggleTodo = async ({
  id,
  status,
  title,
  description,
  completion,
  subtask,
  tag,
}) => {
  let res = await axios.put(`http://localhost:3001/todos/${id}`, {
    title: title,
    status: !status,
    description: description,
    completion: completion,
    subtask: subtask,
    tag: tag,
  });
  return;
};

export const toggleSubTodo = async ({
  id,
  status,
  title,
  description,
  completion,
  subtask,
  tag,
  id1,
}) => {
  let res = await axios.put(`http://localhost:3001/todos/${id}`, {
    title: title,
    status: status,
    description: description,
    completion: completion,
    subtask: subtask.map((el) =>
      el.id1 === id1 ? { ...el, status1: !el.status1 } : el
    ),
    tag: tag,
  });
  return;
};

export const deleteTodo = async (id) => {
  let res = await axios.delete(`http://localhost:3001/todos/${id}`);
  return;
};
export const deleteSubTodo = async ({
  id,
  status,
  title,
  description,
  completion,
  subtask,
  tag,
  id1,
}) => {
  let res = await axios.put(`http://localhost:3001/todos/${id}`, {
    title: title,
    status: status,
    description: description,
    completion: completion,
    subtask: subtask.filter((el) => el.id1 !== id1),
    tag: tag,
  });
  return;
};

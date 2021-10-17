import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import {
  addTodoError,
  addTodoLoading,
  addTodoSuccess,
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../../Redux/action";
import {
  getTodos,
  addTodos,
  toggleTodo,
  deleteTodo,
  toggleSubTodo,
  deleteSubTodo,
} from "../../utils/jsonServer";

const initialData = {
  title: "",
  description: "",
  completion: "",
  subtask: [],
  tag: "",
};

export default function Home() {
  const [inputData, setInputData] = useState(initialData);
  const [titleName, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const { data, isLoading, isError } = useSelector((state) => state.todos);
  const [display, setDisplay] = useState(false);
  const [subTodo, setSubTodo] = useState([]);
  const [completionTag, setCompletionTag] = useState("Todo");
  const [subTodoTitle, setSubTodoTitle] = useState("");
  const [tag, setTag] = useState("Personal");

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetData();
  }, []);
  let handleAddData = async () => {
    dispatch(addTodoLoading());
    try {
      let data = await addTodos(inputData);
      dispatch(addTodoSuccess(data));
      handleGetData();
    } catch (err) {
      console.log(err.message);
      dispatch(addTodoError(err.message));
    }
  };

  let handleGetData = async () => {
    dispatch(getTodoLoading());
    try {
      let data = await getTodos();
      dispatch(getTodoSuccess(data));
    } catch (err) {
      dispatch(getTodoError(err.message));
    }
  };

  const handleToggleTodo = async (el) => {
    let res = await toggleTodo(el);
    handleGetData();
  };

  const handleSubTodoToggle = async (el) => {
    let res = await toggleSubTodo(el);
    handleGetData();
  };
  const handleDeleteTodo = async (el) => {
    let res = await deleteTodo(el);
    handleGetData();
  };
  const handleDeleteSubTodo = async (el) => {
    let res = await deleteSubTodo(el);
    handleGetData();
  };

  return isLoading ? (
    <div>...Loading</div>
  ) : isError ? (
    <div>error</div>
  ) : (
    <div className={styles.home}>
      <div className={styles.addTodo}>
        {display ? (
          <>
            <div className={styles.addTodoInputs}>
              <div className={styles.addTodoInputBox}>
                <input
                  type="text"
                  placeholder="todo"
                  style={{ height: "83%" }}
                  value={titleName}
                  onChange={(e) => {
                    setTitleName(e.target.value);
                    setInputData((prev) => {
                      return {
                        ...prev,
                        title: e.target.value,
                      };
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Description"
                  style={{ height: "83%" }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setInputData((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <button onClick={handleAddData}>Add Todo</button>
            </div>
            <select
              onChange={(e) => {
                setCompletionTag(e.target.value);
                setInputData((prev) => {
                  return {
                    ...prev,
                    completion: e.target.value,
                  };
                });
              }}
            >
              <option value="Todo">Completion catagory</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select
              onChange={(e) => {
                setTag(e.target.value);
                setInputData((prev) => {
                  return {
                    ...prev,
                    tag: e.target.value,
                  };
                });
              }}
            >
              <option value="Personal">Tag</option>
              <option value="Personal">Personal</option>
              <option value="Official">Official</option>
              <option value="Others">Others</option>
            </select>
            <div>
              <span>
                <input
                  type="text"
                  value={subTodoTitle}
                  placeholder="subtodo"
                  onChange={(e) => setSubTodoTitle(e.target.value)}
                />
              </span>
              <button
                onClick={() => {
                  setSubTodo((prev) => {
                    return [...prev, subTodoTitle];
                  });
                  setInputData((prev) => {
                    return {
                      ...prev,
                      subtask: [...subTodo, subTodoTitle],
                    };
                  });
                  setSubTodoTitle("");
                }}
              >
                Add SubTodo
              </button>
              <div>
                {subTodo.map((el) => (
                  <div>{el}</div>
                ))}
              </div>
            </div>
            <div className={styles.addTodoButton}>
              <button onClick={() => setDisplay(false)}>Cancel</button>
            </div>
          </>
        ) : (
          <div className={styles.addTodoButton}>
            <button onClick={() => setDisplay(true)}>Add Todo</button>
          </div>
        )}
      </div>
      <div className={styles.allTodoBox}>
        {data.map(
          ({ id, status, title, description, completion, subtask, tag }) => (
            <div className={styles.eachTodoBox} key={id}>
              <div className={styles.deleteBox}>
                <div onClick={() => handleDeleteTodo(id)}>
                  <i className="ion-close-round" />
                </div>
              </div>
              <div className={styles.titleBox}>
                <div className={styles.titleBoxTaskNo}>{`${id}`}</div>
                <div>
                  <div className={styles.titleBoxName}>
                    <div>
                      <div>
                        <div
                          style={{
                            display: "inline-block",
                            marginRight: "8px",
                          }}
                        >{`${title}`}</div>
                        <span style={{ fontSize: "10px" }}>{tag}</span>
                      </div>
                      <div>{description}</div>
                    </div>
                    <Link className={styles.titleBoxEdit} to={`/todo/${id}`}>
                      <i className="ion-edit" />
                    </Link>
                  </div>
                </div>
                <div>
                  {subtask.map(({ status1, subtask1, id1 }) => (
                    <div style={{ display: "flex" }}>
                      <div>
                        <i
                          onClick={() =>
                            handleSubTodoToggle({
                              id,
                              status,
                              title,
                              description,
                              completion,
                              subtask,
                              tag,
                              id1,
                            })
                          }
                          style={{ marginRight: "10px" }}
                          className={`${
                            status1
                              ? "ion-ios7-circle-filled"
                              : "ion-ios7-circle-outline"
                          }`}
                        />
                      </div>
                      <div style={{ flex: 1 }}>{subtask1}</div>
                      <div
                        onClick={() =>
                          handleDeleteSubTodo({
                            id,
                            status,
                            title,
                            description,
                            completion,
                            subtask,
                            tag,
                            id1,
                          })
                        }
                      >
                        <i className="ion-ios7-trash-outline" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.toggleBox}>
                  <div>{`Status: ${status ? "Completed" : "Pending"}`}</div>
                  <div
                    onClick={() =>
                      handleToggleTodo({
                        id,
                        status,
                        title,
                        description,
                        completion,
                        subtask,
                        tag,
                      })
                    }
                  >
                    <label className={styles.switch}>
                      <input type="checkbox" checked={status ? true : false} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

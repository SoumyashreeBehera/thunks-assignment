import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Completed.module.css";
import {
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../../Redux/action";
import {
  toggleTodo,
  deleteTodo,
  getCompletedTodos,
  toggleSubTodo,
  deleteSubTodo,
} from "../../utils/jsonServer";

export default function Completed() {
  // const [inputData, setInputData] = useState("");
  const { data, isLoading, isError } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetData();
  }, []);

  // let handleAddData = async () => {
  //   dispatch(addTodoLoading());
  //   try {
  //     let data = await addTodos(inputData);
  //     dispatch(addTodoSuccess(data));
  //     handleGetData();
  //   } catch (err) {
  //     dispatch(addTodoError(err.message));
  //   }
  // };

  let handleGetData = async () => {
    dispatch(getTodoLoading());
    try {
      let data = await getCompletedTodos();
      dispatch(getTodoSuccess(data));
    } catch (err) {
      dispatch(getTodoError(err.message));
    }
  };

  const handleToggleTodo = async (el) => {
    let res = await toggleTodo(el);
    handleGetData();
  };
  const handleDeleteTodo = async (el) => {
    let res = await deleteTodo(el);
    handleGetData();
  };

  const handleSubTodoToggle = async (el) => {
    let res = await toggleSubTodo(el);
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
// <button onClick={() => handleEdit(el.id)}>Edit</button>;

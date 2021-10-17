import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  deleteSubTodo,
  getSingleTodos,
  toggleSubTodo,
  toggleTodo,
} from "../../utils/jsonServer";
import styles from "./EditPage.module.css";

const initialData = {
  title: "",
  description: "",
  completion: "",
  subtask: [],
  tag: "",
};

export const EditPage = () => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState(initialData);
  const [inputData, setInputData] = useState("");
  const [decriptionInput, setDecriptionInput] = useState("");
  const [subTodoTitle, setSubTodoTitle] = useState("");

  const { id } = useParams();
  useEffect(() => {
    getSingleData();
  }, []);
  const getSingleData = async () => {
    let data = await getSingleTodos(id);
    setInputData(data.title);
    setDecriptionInput(data.description);
    // console.log(data.subtask);
    setTodo(data);
  };

  const handleToggleTodo = async (el) => {
    let res = await toggleTodo(el);
    getSingleData();
  };

  const handleTitleChange = async () => {
    console.log(inputData);
    let newData = {
      ...todo,
      status: !todo.status,
      title: inputData,
      description: decriptionInput,
      subtask: [
        ...todo.subtask,
        { status1: false, id1: uuid(), subtask1: subTodoTitle },
      ],
    };
    let data = await toggleTodo(newData);
    getSingleData();
  };

  const handleSubTodoToggle = async (el) => {
    let res = await toggleSubTodo(el);
    getSingleData();
  };
  const handleDeleteSubTodo = async (el) => {
    let res = await deleteSubTodo(el);
    getSingleData();
  };

  return (
    <div>
      <div className={styles.addTodo}>
        {edit ? (
          <div>
            <div className={styles.addTodoInputs}>
              <div className={styles.addTodoInputBox}>
                <input
                  type="text"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                  placeholder="new Todo"
                />
                <input
                  type="text"
                  placeholder="Description"
                  style={{ height: "83%" }}
                  value={decriptionInput}
                  onChange={(e) => setDecriptionInput(e.target.value)}
                />
              </div>
              <button onClick={handleTitleChange}>Submit</button>
            </div>
            <div>
              <span>
                <input
                  type="text"
                  value={subTodoTitle}
                  placeholder="subtodo"
                  onChange={(e) => setSubTodoTitle(e.target.value)}
                />
              </span>
            </div>
            <div className={`${styles.addTodoButton} ${styles.togglebtn}`}>
              <button onClick={() => handleToggleTodo(todo)}>
                Toggle Status
              </button>
            </div>
            <div className={styles.addTodoButton}>
              <button onClick={() => setEdit(!edit)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className={styles.addTodoButton}>
            <button onClick={() => setEdit(true)}>Edit Todo</button>
          </div>
        )}
      </div>
      <div className={styles.allTodoBox}>
        <div className={styles.eachTodoBox}>
          {/* <div>{todo.title}</div> */}
          <div className={styles.titleBox}>
            <div className={styles.titleBoxTaskNo}>{`${todo.id}`}</div>
            <div>
              <div className={styles.titleBoxName}>
                <div>
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        marginRight: "8px",
                      }}
                    >{`${todo.title}`}</div>
                    <span style={{ fontSize: "10px" }}>{todo.tag}</span>
                  </div>
                  <div>{todo.description}</div>
                </div>
                <div
                  className={styles.titleBoxEdit}
                  onClick={() => setEdit(!edit)}
                >
                  <i className="ion-edit" />
                </div>
              </div>
            </div>
            {/* <div>{todo.status + ""}</div> */}

            <div>
              {todo.subtask.map(({ status1, subtask1, id1 }) => (
                <div style={{ display: "flex" }}>
                  <div>
                    <i
                      onClick={() =>
                        handleSubTodoToggle({
                          ...todo,
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
                        ...todo,
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
              <div>{`Status: ${todo.status ? "Completed" : "Pending"}`}</div>
            </div>
            {/* <button onClick={() => setEdit(!edit)}>Edit</button> */}
          </div>
          <div className={styles.backbtnbox}>
            <Link className={styles.backbtn} to="/">
              <button>Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

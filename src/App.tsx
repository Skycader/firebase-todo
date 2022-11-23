import { useState, useReducer, useEffect } from "react";
import style from "./App.module.less";
import { AddTodo } from "./components/addTodo/addTodo";
import { EditTodo } from "./components/editTodo/editTodo";
import { Modal } from "./components/modal/modal";
import TodoList from "./components/TodoList/TodoList";
import { Context } from "./context/context";
import reducer from "./reducer";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { IContext, IDoc, ITodo } from "./models/context";

function App() {
  const [todoTitle, setTodoTitle] = useState<ITodo[]>();
  const initialValue = {
    modalAdd: false,
    modalEdit: false,
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  const toggleAdd = () => {
    dispatch({
      type: "toggleAdd",
      payload: {
        id: 0,
        title: "",
        time: Date.now(),
        completed: false,
        description: "",
        modal: false,
        files: [],
      },
    });
  };

  const [tasks, setTasks] = useState<ITodo[]>([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ts: ITodo[] = [];
      querySnapshot.forEach((doc: IDoc) => {
        ts.push({ ...doc.data(), id: doc.id });
      });
      setTasks(ts);
      console.log(ts);
    });
  }, []);

  return (
    <Context.Provider
      value={{
        dispatch,
      }}
    >
      {!tasks.length && (
        <div
          style={{ margin: 0, top: 0, position: "fixed", zIndex: 4 }}
          className="progress"
        >
          <div className="indeterminate"></div>
        </div>
      )}

      <div className="container">
        <h1>📒Todo app</h1>
        <h1 />
        <div className={style.add}>
          <a
            onClick={() => toggleAdd()}
            className="btn-floating btn-large waves-effect waves-light red"
          >
            <i className="material-icons">add</i>
          </a>
        </div>

        <TodoList todos={tasks} modalAdd={false} modalEdit={false} />
      </div>

      {state.modalAdd && (
        <Modal>
          <AddTodo></AddTodo>
        </Modal>
      )}
      {state.modalEdit && (
        <Modal>
          {state.current && <EditTodo todo={state.current}></EditTodo>}
        </Modal>
      )}
    </Context.Provider>
  );
}

export default App;

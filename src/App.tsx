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
} from 'firebase/firestore';
import { db } from "./firebase";
import { ITodo } from "./models/context";

function App() {
  const [todoTitle, setTodoTitle] = useState();
  const [state, dispatch] = useReducer(reducer, {
    modal: false,
    current: {}
  });

  const toggleAdd = () => {
    dispatch({
      type: "toggleAdd",
    });
  };

   const [tasks, setTasks] = useState([])

   useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let ts:ITodo[] = [] 
      querySnapshot.forEach((doc) => {
      ts.push({ ...doc.data(), id: doc.id });
     
      });
       setTasks(ts)
       console.log(ts)
    });
  },[] )

  return (
    <Context.Provider
      value={{
        dispatch,
      }}
    >

      <div className="container">
        <h1>📒Todo app</h1>
        <h1/>
        <div className={style.add}>
          <a
            onClick={() => toggleAdd()}
            className="btn-floating btn-large waves-effect waves-light red"
          >
            <i className="material-icons">add</i>
          </a>
        </div>

        <TodoList todos={tasks} />
      </div>

      {state.modalAdd && (
        <Modal>
          <AddTodo></AddTodo>
        </Modal>
      )}
      {state.modalEdit && (
        <Modal>
          <EditTodo todo={state.current}></EditTodo>
        </Modal>
      )}
      
    </Context.Provider>
  );
}

export default App;

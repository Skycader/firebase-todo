import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Context } from "../../context/context";
import { db } from "../../firebase";
import { ITodo } from "../../models/context";

/**
 * Functional component to display a todo item
 * @param props of interface Todo
 * @returns TSX <li> containing title, description, deadline, files and buttons to control it
 */
export default function TodoItem(props: ITodo) {
  let { title, id, completed, description, time } = props;
  const { dispatch } = useContext(Context);

  const cls = ["todo"];
  const overdue = (dayjs().isAfter(time)) ? "overdue" : ""
  const toggleTodo = async (todo: any) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  if (completed) {
    cls.push("completed");
  }

   
  return (
    <li className={cls.join(" ")}>
      <label className={overdue}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => {
             toggleTodo(props)
          }}
        />
        <span>{title}</span>

        <i
          className="material-icons"
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: "openEdit",
              payload: {
                id,
                title,
                description,
                time
              },
            });
          }}
        >
          edit
        </i>
      </label>
    </li>
  );
}

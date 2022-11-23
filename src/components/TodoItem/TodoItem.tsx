import dayjs from "dayjs";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { Context } from "../../context/context";
import { db } from "../../firebase";
export default function TodoItem(props: any) {
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
              type: "toggleEdit",
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

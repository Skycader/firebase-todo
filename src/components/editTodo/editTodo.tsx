import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { db } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./../../firebase";
import dayjs from 'dayjs'
import { ITodo, ITodoEdit } from "../../models/context";

/**
 * Functional component to fill the contents of modal when editing
 * @param props ITodoEdit
 * @returns TSX form to edit todo
 */
const EditTodo = (props: ITodoEdit) => {

  const [title, setTitle] = useState(props.todo.title);
  const [description, setDescription] = useState(props.todo.description);
  const { dispatch } = useContext(Context);
  const [todoUpload, setTodoUpload] = useState<string[]>([]);
  const [todoUrls, setTodoUrls] = useState<string[]>([]);
  const [todoNames, setTodoNames] = useState<string[]>([]);
  const [date, setDate] = useState(dayjs(props.todo.time).format('YYYY-MM-DD'));
  const [time, setTime] = useState(dayjs(props.todo.time).format('HH:mm'));

  const updateTodo = async (todo: ITodo) => {
    /* Sorry, but I have no idea why it doesn't work with typescript here! Mb you show me how it's fixed? */
    /* It's taken from documentation by the way */
    const todoRf = doc(db, "todos", todo.id);

    await updateDoc(todoRf, {
      title,
      description,
      time: dayjs(date+" "+time).valueOf()
    });
  };

  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const todoListRef = ref(storage, props.todo.id);
  const uploadFile = () => {
    if (!todoUpload) return;
    const todoRef = ref(storage, `${props.todo.id}/${todoUpload.name}`);
    uploadBytes(todoRef, todoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setTodoUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    setTodoUrls([]);
    setTodoNames([]);

    listAll(todoListRef).then((response) => {
      console.log(response.items);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setTodoNames((prev) => [...prev, item.name]);
          setTodoUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="container ">
      <h2>Edit Todo</h2>
      <div className="input-field col s6">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
        />
        <label className="active">Title</label>
      </div>

      <div className="input-field col s6">
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="materialize-textarea"
        ></textarea>
        <label className="active">Description</label>
      </div>

      <div className="input-field col s6">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Deadline</label>
      </div>

      <div className="file-field input-field">
        <div className="btn">
          <span>
            <i className="material-icons">attach_file</i>
          </span>
          <input
            type="file"
            multiple
            onChange={(event) => {
              if (event.target?.files) setTodoUpload(event.target.files[0]);
            }}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <ul>
        {todoUrls.map((url, i) => (
          <li>
            <a href={url}>{todoNames[i]}</a>
          </li>
        ))}
      </ul>
      <div className="row">
        <button
          onClick={() => {
            updateTodo(props.todo);

            uploadFile();
            dispatch({
              type: "closeEdit",
            });
          }}
          className="col s12 l3 btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Save
          <i className="material-icons right">edit</i>
        </button>
        <div className="col s1"></div>
        <button
          onClick={() => {
            dispatch({
              type: "closeEdit",
            });
          }}
          className="col l4 s12 btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Cancel
          <i className="material-icons right">close</i>
        </button>
        <div className="col s1"></div>
        <button
          onClick={() => {
            deleteTodo(props.todo.id);
             
            dispatch({
              type: "closeEdit",
            });
          }}
          className="col l3 s12 btn waves-effect waves-light red"
          type="submit"
          name="action"
        >
          Remove Todo
          <i className="material-icons right">delete</i>
        </button>
      </div>
    </div>
  );
};

export { EditTodo };

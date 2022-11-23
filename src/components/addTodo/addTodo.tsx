import { useContext, useState } from "react";
import { Context } from "../../context/context";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import dayjs from "dayjs";
import { IUpload } from "../../models/context";
  /**
 * Functional component to fill the contents of modal when creating todo
 * @param props ITodoEdit
 * @returns TSX form to edit todo
 */
const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { dispatch } = useContext(Context);
  const [todoUrls, setTodoUrls] = useState<string[]>([]);
  const [todoUpload, setTodoUpload] = useState<Blob&IUpload>();

  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");


/**
 * createTodo function to add a document to Firebase
 */
  const createTodo = async () => {
    let res = await addDoc(collection(db, "todos"), {
      title,
      description,
      completed: false,
      time: dayjs(date + time).valueOf(),
    });

    const uploadFile = () => {
      if (!todoUpload) return;
      let {name} = todoUpload
      const todoRef = ref(storage, `${res.id}/${name}`);
      uploadBytes(todoRef, todoUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setTodoUrls((prev) => [...prev, url]);
        });
      });
    };

    uploadFile();
  };
  
  return (
    <div className="container ">
      <h2>Todo</h2>
      <div className="input-field col s6">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
        />
        <label>Title</label>
      </div>

      <div className="input-field col s6">
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="materialize-textarea"
        ></textarea>
        <label>Description</label>
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
            onChange={(event) => {
              if (event?.target?.files)
              setTodoUpload(event.target.files[0]);
            }}
            multiple
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <div className="row">
        <button
          onClick={() => {
            createTodo();
            // dispatch({
            //   type: "addTodo",
            //   payload: {
            //     title: title
            //   }
            // })
            dispatch({
              type: "toggleAdd",
            });
          }}
          className="col s12 l5 btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Save
          <i className="material-icons right">edit</i>
        </button>
        <div className="col s2"></div>
        <button
          onClick={() => {
            dispatch({
              type: "toggleAdd",
            });
          }}
          className="col l5 s12 btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Cancel
          <i className="material-icons right">close</i>
        </button>
      </div>
    </div>
  );
};

export { AddTodo };

import React, { useContext, useState } from "react";
import { Input } from "antd";
import classes from "./MainContainer.module.css";
import { Context } from "../Context";
import axios from "axios";

const MainContainer = () => {
  const { chosenNote, redactNote, getNotes } = useContext(Context);
  const [note, setNote] = useState({ title: "", body: "" });
  const { TextArea } = Input;

  const patchNote = async () => {
    await axios.patch(`http://localhost:3001/notes/${chosenNote.id}`, note)
    getNotes()
  }

  return (
    <div>
      {(redactNote && chosenNote) ?

          <div className={classes.mainContainer}>
            <TextArea
                className={classes.mainContainer_textarea}
                onChange={e => setNote({...note, title: e.target.value})}
                placeholder="Название заметки..."
                value={note.title}
            />
            <TextArea

                className={classes.mainContainer_textarea}
                onChange={e => setNote({...note, body: e.target.value})}
                placeholder="Текст заметки..."
                value={note.body}
            />
            <button onClick={patchNote}>save</button>
          </div>
          :
          <div className={classes.mainContainer}>
            <h3>{chosenNote.title}</h3>
            <p>{chosenNote.body}</p>
          </div>
      }


    </div>
  );
};

export default MainContainer;

import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "antd";
import classes from "./MainContainer.module.css";
import { Context } from "../../constants/Context";
import api from "../../API/api";

const MainContainer = () => {
  const { chosenNote, redactNote, getNotes } = useContext(Context);
  const [note, setNote] = useState({
    title: chosenNote.title,
    body: chosenNote.body,
  });
  const { TextArea } = Input;

  const ref = useRef({});

  const patchNote = async (redactNote) => {
    await api.patchNote({ ...redactNote, id: chosenNote.id });
    getNotes();
  };

  const debounce = (callee, timeoutMs) => {
    return function perform(...args) {
      let previousCall = ref.current.lastCall;
      ref.current.lastCall = Date.now();
      if (previousCall && ref.current.lastCall - previousCall <= timeoutMs) {
        clearTimeout(ref.current.lastCallTimer);
      }
      if (
        !ref.current.lastSuccessCall ||
        ref.current.lastCall - ref.current.lastSuccessCall >= timeoutMs
      ) {
        callee(...args);
        ref.current.lastSuccessCall = Date.now();
      }
      ref.current.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
  };

  const debouncePatchNote = debounce(patchNote, 1500);

  const handleChange = (e, name) => {
    setNote({ ...note, [name]: e.target.value });
    debouncePatchNote({ ...note, [name]: e.target.value });
  };

  useEffect(() => {
    setNote({ title: chosenNote.title, body: chosenNote.body });
  }, [chosenNote]);

  return (
    <div>
      {redactNote && chosenNote ? (
        <div className={classes.mainContainer}>
          <TextArea
            className={classes.mainContainer_textarea_title}
            onChange={(e) => handleChange(e, "title")}
            placeholder="Название заметки..."
            value={note.title}
            autoSize
          />
          <TextArea
            className={classes.mainContainer_textarea_body}
            onChange={(e) => handleChange(e, "body")}
            placeholder="Текст заметки..."
            value={note.body}
            autoSize
          />
        </div>
      ) : (
        <div className={classes.mainContainer}>
          <h3>{chosenNote.title}</h3>
          <p>{chosenNote.body}</p>
        </div>
      )}
    </div>
  );
};

export default MainContainer;

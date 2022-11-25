import React, { useContext, useState } from "react";
import { Context } from "../Context";
import classes from "./NoteCard.module.css";

const NoteCard = ({ note }) => {
  const { setChosenNote } = useContext(Context);

  return (
    <div
      onClick={() => {
        setChosenNote(note);
      }}
      className={classes.noteCard}
      tabIndex="0"
    >
      <h4>{note.title}</h4>
      <p>{note.body}</p>
    </div>
  );
};

export default NoteCard;

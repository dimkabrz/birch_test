import React, { useContext } from "react";
import { Context } from "../../constants/Context";
import classes from "./NoteCard.module.css";

const NoteCard = ({ note }) => {
  const { setChosenNote, setRedactNote, chosenNote } = useContext(Context);

  return (
    <div
      onClick={() => {
        setChosenNote(note);
        setRedactNote(false);
      }}
      className={
        chosenNote.id === note.id ? classes.noteCard_focus : classes.noteCard
      }
    >
      <h4 className={classes.noteCard_h}>{note.title}</h4>
      <p className={classes.noteCard_p}>{note.body}</p>
    </div>
  );
};

export default NoteCard;

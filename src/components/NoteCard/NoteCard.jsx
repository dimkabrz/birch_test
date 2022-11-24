import React, {useContext, useState} from 'react';
import {Context} from "../Context";

const NoteCard = ({note}) => {

    const {setChosenNote, chosenNote} = useContext(Context)


    return (
        <div onClick={()=> {setChosenNote(note)}}>
            <h4>{note.title}</h4>
            <p>{note.body}</p>
        </div>
    );
};

export default NoteCard;
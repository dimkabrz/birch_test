import React, {useContext} from 'react';
import classes from "./SideBar.module.css";
import NoteCard from "../../NoteCard/NoteCard";
import {Context} from '../../Context'



const SideBar = () => {
    const {notes} = useContext(Context)


    return (
            <div className={classes.sideBar}>
                {notes.map(note=>(
                    <NoteCard note={note} key={note.id}/>
                ))}
            </div>
    );
};

export default SideBar;
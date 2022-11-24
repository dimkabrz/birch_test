import React, {useContext, useState} from 'react';
import {Input} from "antd";
import classes from "./MainContainer.module.css";
import axios from "axios";
import {Context} from "../Context";

const MainContainer = () => {

    const {getNotes} = useContext(Context)
    const [note, setNote] = useState({title:'', body:''})
    const { TextArea } = Input;

    const addNote = async () => {
        try{
            if (!note.title) return;
            const response = await axios.post(`http://localhost:3001/notes`, note)
            getNotes()
            setNote({title:'', body:''})
        }
        catch{
        }

    }

    return (
        <div>
            <TextArea
                className={classes.mainContainer_textarea}
                onChange={e=>setNote({...note, title:e.target.value})}
                placeholder="Название заметки..."
                value={note.title}
            />
            <TextArea
                className={classes.mainContainer_textarea}
                onChange={e=>setNote({...note, body:e.target.value})}
                placeholder="Текст заметки..."
                value={note.body}
            />
            <button onClick={addNote}>save</button>
        </div>
    );
};

export default MainContainer;
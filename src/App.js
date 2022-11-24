import './App.css';
import NavBar from "./components/UI/NavBar/NavBar";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Context} from './components/Context'

function App() {

    const [notes, setNotes] = useState([])
    const [chosenNote, setChosenNote] = useState({})

    const getNotes = async () => {
        const response = await axios.get(`http://localhost:3001/notes`)
        setNotes(response.data)
    }

    useEffect(()=>{
        getNotes()
    },[])

    return (
      <Context.Provider value={{notes, getNotes, setChosenNote, chosenNote}}>
          <div className="App">
              <NavBar/>
              <WorkSpace/>
          </div>
      </Context.Provider>

  );
}

export default App;

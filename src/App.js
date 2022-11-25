import "./App.css";
import NavBar from "./components/UI/NavBar/NavBar";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Context } from "./components/Context";

function App() {
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState({});
  const deleteNote = async (chosenNote) => {
    await axios.delete(
        `http://localhost:3001/notes/${chosenNote.id}`
    );
  }

  const [redactNote, setRedactNote] = useState(false)


  const getNotes = async () => {
    const response = await axios.get(`http://localhost:3001/notes`);
    setNotes(response.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Context.Provider
      value={{ notes, getNotes, setChosenNote, chosenNote, setNotes, deleteNote, redactNote, setRedactNote}}
    >
      <div className="App">
        <NavBar />
        <WorkSpace />
      </div>
    </Context.Provider>
  );
}

export default App;

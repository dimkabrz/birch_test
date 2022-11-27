import "./App.css";
import NavBar from "./components/UI/NavBar/NavBar";
import WorkSpace from "./components/WorkSpace/WorkSpace";
import React, { useEffect, useState } from "react";
import { Context } from "./constants/Context";
import api from "./API/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [chosenNote, setChosenNote] = useState({});

  const [redactNote, setRedactNote] = useState(false);

  const getNotes = async (searchText) => {
    const response = await api.getNotes(searchText);
    setNotes(response.data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Context.Provider
      value={{
        notes,
        getNotes,
        setChosenNote,
        chosenNote,
        redactNote,
        setRedactNote,
      }}
    >
      <div className="App">
        <NavBar />
        <WorkSpace />
      </div>
    </Context.Provider>
  );
}

export default App;

import React, { useContext, useState } from "react";
import classes from "./NavBar.module.css";
import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import {DeleteOutlined, EditOutlined, PlusSquareOutlined, SearchOutlined} from "@ant-design/icons";
import { Context } from "../../Context";
import axios from "axios";

const NavBar = () => {
  const { chosenNote, getNotes, setNotes, setChosenNote, deleteNote, redactNote, setRedactNote } = useContext(Context);


  const [newNote, setNewNote] = useState({title:'', body:''})
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const showAddModal = () => {
    setIsAddModalOpen(true)
  }
  const addNote = async () => {
    try {
      if (!newNote.title) return;
      await axios.post(`http://localhost:3001/notes`, newNote);
      getNotes(chosenNote);
      setNewNote({ title: "", body: "" });
      setIsAddModalOpen(false)
    } catch {}
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      deleteNote(chosenNote);   //Пока под вопросом работоспособность, перерисовка некорректная идет
      // раньше отсюда напрямую удалял
      setIsModalOpen(false);
      getNotes();
      setChosenNote({})
    } catch {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const addHandleCancel = () => {
    setIsAddModalOpen(false);
    setNewNote({ title: "", body: "" });
  };

  const fetchSetter = async (searchText) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/notes?q=${searchText}`
      );
      setNotes(response.data);
    } catch {}
  };

  const getContact = async (e) => {
    const searchText = e.target.value;
    setSearch(() => {
      fetchSetter(searchText);
      return searchText;
    });
  };
  return (
    <div className={classes.navBar}>
      <Modal
        title="Удалить заметку?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
      <Modal
          title="Введите заметку"
          open={isAddModalOpen}
          onOk={addNote}
          onCancel={addHandleCancel}
      >
        <Input
            className={classes.addModalInput}
          placeholder='Заголовок'
          value={newNote.title}
          onChange={e=>setNewNote({...newNote, title:e.target.value})}
        />
        <Input
            className={classes.addModalInput}
          placeholder='Описание'
          value={newNote.body}
          onChange={e=>setNewNote({...newNote, body:e.target.value})}
        />
      </Modal>
      <Button onClick={showAddModal}><PlusSquareOutlined /></Button>
      <Button onClick={setRedactNote(true)}><EditOutlined /></Button>
      <Button onClick={showModal}><DeleteOutlined /></Button>
      <Input
        className={classes.navBar_input}
        value={search}
        onChange={(e) => getContact(e)}
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default NavBar;

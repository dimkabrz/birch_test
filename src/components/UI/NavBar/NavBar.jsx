import React, { createContext, useContext, useState } from "react";
import classes from "./NavBar.module.css";
import { Button, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import { Context } from "../../Context";
import axios from "axios";

const NavBar = () => {
  const { chosenNote, getNotes, setNotes } = useContext(Context);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/notes/${chosenNote.id}`
      );
      getNotes();
      setIsModalOpen(false);
    } catch {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Button><EditOutlined /></Button>
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

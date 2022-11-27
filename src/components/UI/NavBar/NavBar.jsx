import React, { useContext, useState } from "react";
import classes from "./NavBar.module.css";
import { Button, Form, Input } from "antd";
import Modal from "antd/es/modal/Modal";
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Context } from "../../../constants/Context";
import SearchBox from "../../SearchBox/SearchBox";
import api from "../../../API/api";

const NavBar = () => {
  const { chosenNote, getNotes, setChosenNote, setRedactNote } =
    useContext(Context);

  const [newNote, setNewNote] = useState({ title: "", body: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const addNote = async () => {
    try {
      if (!newNote.title) return;
      await api.addNewNote(newNote);
      getNotes();
      setNewNote({ title: "", body: "" });
      setIsAddModalOpen(false);
    } catch {}
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    try {
      await api.deleteNote(chosenNote);
      setIsModalOpen(false);
      getNotes();
      setChosenNote({});
    } catch {}
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const addHandleCancel = () => {
    setIsAddModalOpen(false);
    setNewNote({ title: "", body: "" });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.navBar}>
      <Modal
        title="Удалить заметку?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Modal
        title="Введите заметку"
        open={isAddModalOpen}
        onCancel={addHandleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={addNote}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Заголовок">
            <Input
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item label="Описание">
            <Input
              value={newNote.body}
              onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={showAddModal}>
        <PlusSquareOutlined />
      </Button>
      <Button onClick={() => setRedactNote(true)}>
        <EditOutlined />
      </Button>
      <Button onClick={showModal}>
        <DeleteOutlined />
      </Button>
      <SearchBox />
    </div>
  );
};

export default NavBar;

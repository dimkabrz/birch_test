import React, {createContext, useContext, useState} from 'react';
import classes from "./NavBar.module.css";
import {Button, Input} from "antd";
import Modal from "antd/es/modal/Modal";
import { SearchOutlined } from "@ant-design/icons";
import {Context} from "../../Context";
import axios from "axios";


const NavBar = () => {

    const {chosenNote,getNotes} = useContext(Context)


    const onSearch = (value) => console.log(value);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        const response = await axios.delete(`http://localhost:3001/notes/${chosenNote.id}`);
        getNotes();
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={classes.navBar}>

            <Modal title="Удалить заметку?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
            </Modal>
            <Button onClick={showModal}>Удалить задачу</Button>
            <Input
                className={classes.navBar_input}
                value={search}
                // onChange={(e) => getContact(e)}
                prefix={<SearchOutlined />}
            />
        </div>
    );
};

export default NavBar;
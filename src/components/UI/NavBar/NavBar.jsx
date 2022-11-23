import React, {useState} from 'react';
import classes from "./NavBar.module.css";
import Search from "antd/es/input/Search";
import {Button} from "antd";
import Modal from "antd/es/modal/Modal";


const NavBar = () => {
    const onSearch = (value) => console.log(value);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={classes.navbar}>
            <Modal title="Удалить заметку?" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
            </Modal>
            <Button onClick={showModal}>Удалить задачу</Button>
            <Search
                placeholder="Search"
                onSearch={onSearch}
                style={{
                    width: 200,
                }}
            />
        </div>
    );
};

export default NavBar;
import React from 'react';
import ListItem from "../../ListItem/ListItem";
import classes from "./SideBar.module.css";
const SideBar = () => {


    return (
        <div className={classes.sideBar}>
            <ListItem/>
            <ListItem/>
        </div>
    );
};

export default SideBar;
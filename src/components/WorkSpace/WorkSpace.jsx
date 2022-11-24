import React from "react";
import SideBar from "../UI/Sidebar/SideBar";
import MainContainer from "../MainCotainer/MainContainer";
import classes from "./WorkSpace.module.css";

const WorkSpace = () => {
  return (
    <div className={classes.workSpace}>
      <SideBar />
      <MainContainer />
    </div>
  );
};

export default WorkSpace;

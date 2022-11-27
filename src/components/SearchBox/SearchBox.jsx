import React, { useContext, useState } from "react";
import classes from "../UI/NavBar/NavBar.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Context } from "../../constants/Context";

const SearchBox = () => {
  const { getNotes, setChosenNote } = useContext(Context);

  const [search, setSearch] = useState("");

  const getContact = async (e) => {
    const searchText = e.target.value;
    setChosenNote(false);
    setSearch(() => {
      getNotes(searchText);
      return searchText;
    });
  };
  return (
    <Input
      className={classes.navBar_input}
      value={search}
      onChange={(e) => getContact(e)}
      prefix={<SearchOutlined />}
    />
  );
};

export default SearchBox;

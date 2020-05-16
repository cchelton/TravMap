import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MenuItem, TextField } from "@material-ui/core";

function FriendsListUserSearchBar(props) {
  const [text, updateText] = useState("");
  const handleChange = (event) => {
    updateText(event.target.value);
  };

  const goToUser = (id) => {
    props.history.push(`/user/${id}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    props.dispatch({
      type: "SEARCH_USER",
      payload: {
        username: text,
        goToUser,
      },
    });
    updateText(""); // reset input field
  };

  return (
    <MenuItem>
      <form onSubmit={handleSearch}>
        <TextField
          value={text}
          onChange={handleChange}
          margin="dense"
          placeholder="search users"
        />
      </form>
    </MenuItem>
  );
}

export default withRouter(connect()(FriendsListUserSearchBar));

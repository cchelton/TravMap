import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { MenuItem, TextField, Tooltip } from "@material-ui/core";

function FriendsListUserSearchBar(props) {
  const [text, updateText] = useState("");

  const stopMenuPropagation = (event) => {
    event.stopPropagation();
  };

  const handleChange = (event) => {
    stopMenuPropagation(event);
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
    <Tooltip
      title={`Type a username here and press "enter" to search`}
      placement="left"
      arrow
    >
      <MenuItem>
        <form onSubmit={handleSearch}>
          <TextField
            value={text}
            onChange={handleChange}
            onKeyDown={stopMenuPropagation}
            margin="dense"
            placeholder="search users"
          />
        </form>
      </MenuItem>
    </Tooltip>
  );
}

export default withRouter(connect()(FriendsListUserSearchBar));

import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import ModerationTable from "../../components/ModerationTable/ModerationTable";
import Err404Page from "../Err404Page/Err404Page";

function ModeratorPage(props) {
  if (props.store.user.moderator) {
    return <ModerationTable />;
  } else {
    return <Err404Page />;
  }
}

export default connect(mapStoreToProps)(ModeratorPage);

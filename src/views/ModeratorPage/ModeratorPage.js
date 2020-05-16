import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import ModerationTable from "../../components/ModerationTable/ModerationTable";
import Err403Page from "../Err403Page/Err403Page";

function ModeratorPage(props) {
  if (props.store.user.moderator) {
    return <ModerationTable />;
  } else {
    return <Err403Page />;
  }
}

export default connect(mapStoreToProps)(ModeratorPage);

import React from "react";

function UserProfilePage(props) {
  return (
    <div>
      <h2>{props.match.params.userID}</h2>
    </div>
  );
}

export default UserProfilePage;

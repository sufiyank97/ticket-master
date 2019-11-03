import React from "react";
import { connect } from "react-redux";

function UserAccount(props) {
  return (
    <div className="container">
      <h1>Name:-{props.user.username}</h1>

      <h1>Email:-{props.user.email}</h1>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(UserAccount);

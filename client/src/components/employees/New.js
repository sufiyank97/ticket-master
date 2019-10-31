import React from "react";
import EmployeeFrom from "./Form";
import axios from "../../config/axios";
export default class EmployeeNew extends React.Component {
  constructor() {
    super();
    this.handleEmployeeSubmit = this.handleEmployeeSubmit.bind(this);
  }
  handleEmployeeSubmit(employee) {
    axios
      .post("/employees", employee, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        if (response.data.errors) {
          window.alert(response.data.message);
          console.log("validation error", response.data.errors);
        } else {
          console.log("Success", response.data);
          this.props.history.push("/employees");
        }
      });
  }
  render() {
    return (
      <div>
        <EmployeeFrom handleEmployeeSubmit={this.handleEmployeeSubmit} />
      </div>
    );
  }
}

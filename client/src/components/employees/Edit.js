import React from "react";
import axios from "../../config/axios";
import EmployeeForm from "./Form";

export default class EmployeeEdit extends React.Component {
  constructor() {
    console.log("edit Employee constructor");
    super();
    this.state = {
      employee: {}
    };
  }
  handleEmployeeSubmit = employee => {
    console.log("edit", employee);
    axios
      .put(`/employees/${employee.id}`, employee, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        console.log(response.data);
        if (response.data.errors) {
          window.alert(response.data.message);
          console.log("validation error", response.data.errors);
        } else {
          console.log("success", response.data);
          this.props.history.push(`/employees/${response.data._id}`);
        }
      });
  };
  componentDidMount() {
    console.log("edit employee component did mount");
    const id = this.props.match.params.id;
    axios
      .get(`/employees/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const employee = response.data;
        this.setState({ employee });
      });
  }
  render() {
    return (
      <div>
        {this.state.employee.name && (
          <EmployeeForm
            employee={this.state.employee}
            handleEmployeeSubmit={this.handleEmployeeSubmit}
          />
        )}
      </div>
    );
  }
}

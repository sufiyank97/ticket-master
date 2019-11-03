import React from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";
export default class EmployeeShow extends React.Component {
  constructor() {
    super();
    this.state = {
      employee: {}
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/employees/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const employee = response.data;
        console.log(employee.deptId.name, "sfsd");
        this.setState({ employee }, () => {
          console.log(this.state.employee);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {Object.keys(this.state.employee).length === 0 ? (
          <React.Fragment>
            <h1>Loading ...</h1>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="row h-100 justify-content-center align-items-center mt-5">
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title">
                    Name:-{this.state.employee.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Email:-
                    {this.state.employee.email}
                  </h6>
                  <p className="card-text">
                    Department Name:-{this.state.employee.deptId.name}
                  </p>
                  <Link className="btn btn-primary card-link" to="/employees">
                    Back
                  </Link>
                  <Link
                    className="btn btn-primary card-link"
                    to={`/employees/edit/${this.state.employee._id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

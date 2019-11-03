import React from "react";
// import axios from 'axios'
// import {Link} from 'react-router-dom'
import axios from "../../config/axios";
class DepartmentList extends React.Component {
  constructor() {
    super();
    this.state = {
      departments: [],
      name: ""
    };
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    this.handleDepartmentSubmit = this.handleDepartmentSubmit.bind(this);
  }
  handleDepartmentChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleDepartmentSubmit(e) {
    e.preventDefault();
    const department = {
      name: this.state.name
    };
    console.log(department);
    this.setState({ department });
    axios
      .post("/departments", department, {
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
          const department = response.data;
          this.setState(prev => {
            return {
              departments: [...prev.departments, department]
            };
          });
          // this.setState(prevState=>{
          //     return {departments:[].prevState.departments.concat(department)}
          // })
          this.props.history.push("/departments");
        }
      });
    // this.props.handleCustomerSubmit(formdata)
  }
  handleRemove = id => {
    axios
      .delete(`/departments/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        this.setState(prevState => ({
          departments: prevState.departments.filter(
            department => department._id !== response.data._id
          )
        }));
      })
      .catch(err => {
        console.log(err);
        window.alert(err);
      });
  };
  componentDidMount() {
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const departments = response.data;
        this.setState({ departments });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container mt-5 text-center">
        <h2>Listing Departments {this.state.departments.length}</h2>

        <div className="row h-100 justify-content-center ">
          <div className="col-md-6">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.departments.map(department => (
                  <tr key={department._id}>
                    <td>{department.name}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          const confirm = window.confirm("are you sure");
                          if (confirm) this.handleRemove(department._id);
                          else window.alert("you pressed cancel");
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <h3>Add Departments</h3>
            <form onSubmit={this.handleDepartmentSubmit}>
              <div className="form-group">
                <label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    placeholder="Department Name"
                    name="name"
                    onChange={this.handleDepartmentChange}
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default DepartmentList;

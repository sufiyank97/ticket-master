import React from "react";
import axios from "../../config/axios";
import Select from "react-select";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
export default class TicketsForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.ticket);
    this.state = {
      code: props.ticket ? props.ticket.code : "",
      title: props.ticket ? props.ticket.title : "",
      message: props.ticket ? props.ticket.message : "",
      // isResolved:"",
      priority: props.ticket ? props.ticket.priority : "",
      customerId: props.ticket ? props.ticket.customerId._id : "",
      departmentId: props.ticket ? props.ticket.departmentId._id : "",
      employeesIds: props.ticket
        ? props.ticket.employeesIds.map(e1 => {
            return e1._id;
          })
        : [],
      // employeesIds:[],
      // empId:"",
      customers: [],
      departments: [],
      employees: []
    };
  }
  handleChange = e => {
    if (e.value) {
      this.setState({
        [e.name]: e.value
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  handleDeptChange = e => {
    console.log(e);
    const departmentId = e.value;
    // console.log(e.target.value)
    // console.log(departmentId)
    this.setState({ departmentId });
    axios
      .get("/employees", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const empl = response.data.filter(
          e1 => e1.deptId._id == this.state.departmentId
        );
        const employees = empl.map(e1 => {
          return { value: e1._id, label: e1.name, name: "employees" };
        });

        this.setState({ employees }, () => {
          console.log(this.state.employees);
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleMultiChange = emplo => {
    console.log(emplo);
    const arr = [];
    if (emplo == null) {
      return 0;
    } else {
      emplo.forEach(element => {
        arr.push(element.value);
      });
      const employeesIds = arr;

      this.setState({ employeesIds }, () => {
        console.log(this.state.employeesIds);
      });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const fromData = {
      code: this.state.code,
      title: this.state.title,
      message: this.state.message,
      priority: this.state.priority,
      customerId: this.state.customerId,
      departmentId: this.state.departmentId,
      employeesIds: this.state.employeesIds
    };
    console.log(fromData);
    this.props.handleTicketSubmit(fromData);
  };
  componentDidMount() {
    axios
      .get("/customers", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const customers = response.data.map(e1 => {
          return { value: e1._id, label: e1.name, name: "customerId" };
        });
        this.setState({ customers });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get("/departments", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const departments = response.data.map(e1 => {
          return { value: e1._id, label: e1.name };
        });

        this.setState({ departments });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
        <Form onSubmit={this.handleSubmit}>
          <h3>Add Ticket</h3>
          <div className="form-group">
            <label>
              Code
              <input
                type="text"
                value={this.state.code}
                name="code"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Title
              <input
                type="text"
                value={this.state.title}
                name="title"
                className="form-control"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cust">
              Customer
              {/* <select value={this.state.customerId} onChange={this.handleChange} name="customerId">
                            <option value="">Select</option>
                            {this.state.customers.map(customer=>{
                                // <option>{index+1}</option>
                                return <option key={customer._id} value={customer._id}>{customer.name}</option>
                            })}
                        </select> */}
            </label>
            <Select
              defaultValue={{ label: "Select Customer", value: 0 }}
              onChange={this.handleChange}
              options={this.state.customers}
            />
          </div>
          {/* <div id="cust">
            
            
          </div> */}
          <br />
          <label>
            Department
            {/* <select value={this.state.departmentId} onChange={this.handleDeptChange} name="departmentId">
                            <option value="">Select</option>
                            {this.state.departments.map(department=>{
                                // <option>{index+1}</option>
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })}
                        </select> */}
          </label>
          <div>
            <Select
              defaultValue={{ label: "Select Department", value: 0 }}
              onChange={this.handleDeptChange}
              options={this.state.departments}
            />
          </div>
          <br />
          <label>
            Employees
            {/* <select style={{'width': '100%'}} value={[this.state.employeesIds]} onChange={this.handleMultiChange}   name="employeesIds" multiple >
                            <option value="">Select</option>
                            {this.state.employees.filter(employee=>employee.deptId._id==this.state.departmentId).map(emp=>{
                                return <option key={emp._id} value={[emp._id]}>{emp.name}</option>
                            })
                                // <option>{index+1}</option>
                            } */}
            {/* </select> */}
          </label>
          <div>
            <Select
              isMulti
              onChange={this.handleMultiChange}
              options={this.state.employees}
            />
          </div>
          <br />
          <label htmlFor="textArea">message</label>
          <br />

          <textarea
            value={this.state.message}
            onChange={this.handleChange}
            name="message"
            id="textArea"
          />

          <br />
          <label htmlFor="pri">Priority</label>
          <br />
          <label>
            <input
              type="radio"
              value="high"
              id="pri"
              checked={this.state.priority === "high"}
              onChange={this.handleChange}
              name="priority"
            />
            HIGH
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="medium"
              id="pri"
              checked={this.state.priority === "medium"}
              onChange={this.handleChange}
              name="priority"
            />
            MEDIUM
          </label>
          <br />
          <label>
            <input
              type="radio"
              value="low"
              id="pri"
              checked={this.state.priority === "low"}
              onChange={this.handleChange}
              name="priority"
            />
            LOW
          </label>
          <br />
          <input type="submit" className="btn btn-primary" />
        </Form>
      </div>
    );
  }
}

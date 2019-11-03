import React from "react";
// import axios from 'axios'
import { Link } from "react-router-dom";
import axios from "../../config/axios";
import { Table, Button } from "reactstrap";

export default class TicketList extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
      restore: []
    };
  }
  componentDidMount() {
    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const tickets = response.data.filter(e1 => e1.isDeleted === false);
        // const tickets=response.data
        console.log(tickets);
        this.setState({ tickets });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleRemove = id => {
    axios
      .delete(`/tickets/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        this.setState(prevState => ({
          tickets: prevState.tickets.filter(t1 => t1._id !== response.data._id)
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };
  softRemove = id => {
    const ticket1 = this.state.tickets.map(e1 =>
      e1._id === id ? { ...e1, isDeleted: true } : e1
    );
    console.log(ticket1);
    const ticket_body = ticket1.find(t2 => t2._id === id);
    console.log(ticket_body);
    // const data={
    //     _id:id,
    //     isDeleted:true
    // }
    // console.log(data)
    axios
      .put(`/tickets/softdelete/${id}`, ticket_body, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })

      .then(response => {
        axios
          .get("/tickets", {
            headers: {
              "x-auth": localStorage.getItem("authToken")
            }
          })
          .then(response => {
            const tickets = response.data.filter(e1 => e1.isDeleted === false);
            // const tickets=response.data
            console.log(tickets);
            this.setState({ tickets });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      })
      .catch(err => {
        console.log(axios);
        console.log(err);
      });
  };
  handleRestore = () => {
    axios
      .get("/tickets", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const True = [];
        response.data.forEach(r1 => {
          if (r1.isDeleted === true) True.push(r1._id);
        });
        console.log(True);
        const dd = response.data.map(d1 => {
          return { ...d1, isDeleted: false };
        });
        True.forEach(t1 => {
          const restore = dd.find(d1 => {
            return d1._id === t1;
          });
          axios.put(`/tickets/softdelete/${t1}`, restore, {
            headers: {
              "x-auth": localStorage.getItem("authToken")
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
    // window.location.reload();
    // this.setState(prevState=>({
    //     tickets:prevState.tickets.map(e1=>({...e1,isDeleted:false}))
    // }),()=>{console.log(this.state.tickets)})
  };
  render() {
    return (
      <div className="text-center">
        <h2>Listing Tickets {this.state.tickets.length}</h2>
        <Table striped dark bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Code No</th>
              <th>Customer</th>
              <th>Department</th>
              <th>Employees</th>
              <th>Message</th>
              <th>Priority</th>
              {/* <th>Actions</th> */}
              <th>Remove</th>
              {/* <th>Status</th> */}
              <th>Soft Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets
              .filter(e1 => e1.isDeleted === false)
              .map((ticket, index) => {
                return (
                  <tr key={ticket._id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/tickets/${ticket._id}`}>{ticket.code}</Link>
                    </td>
                    <td>{ticket.customerId.name}</td>
                    <td>{ticket.departmentId.name}</td>
                    <td>
                      {ticket.employeesIds
                        .map(emp => {
                          return emp.name;
                        })
                        .join(",")}
                    </td>
                    <td>{ticket.message}</td>
                    <td>{ticket.priority}</td>
                    {/* <td></td> */}
                    <td>
                      <Button
                        color="danger"
                        onClick={() => {
                          let confirm = window.confirm("Are you Sure");
                          if (confirm) {
                            this.handleRemove(ticket._id);
                          } else {
                            window.alert("you presssed cancel");
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                    {/* <td></td> */}
                    <td>
                      <Button
                        color="secondary"
                        onClick={() => {
                          this.softRemove(ticket._id);
                        }}
                      >
                        Soft Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="row">
          <div className="col-md-6">
            <Button
              color="primary"
              onClick={() => {
                this.handleRestore();
              }}
            >
              Restore
            </Button>
          </div>
          <div className="col-md-4">
            <Button
              color="success"
              onClick={() => {
                this.props.history.push("/tickets/new");
              }}
            >
              {/* <Link to="/tickets/new" /> */}
              Add Tickets
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

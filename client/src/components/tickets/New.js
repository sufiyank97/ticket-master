import React from "react";
import TicketsForm from "./Form";
// import axios from 'axios'
import axios from "../../config/axios";
export default class TicketsNew extends React.Component {
  constructor() {
    super();
    this.handleTicketSubmit = this.handleTicketSubmit.bind(this);
  }
  handleTicketSubmit(ticket) {
    axios
      .post("/tickets", ticket, {
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
          this.props.history.push("/tickets");
        }
      });
  }
  render() {
    return (
      <div>
        <TicketsForm handleTicketSubmit={this.handleTicketSubmit} />
      </div>
    );
  }
}
// export default CustomersNew

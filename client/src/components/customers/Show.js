import React from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios";

export default class CustomersShow extends React.Component {
  constructor() {
    super();
    this.state = {
      customer: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get(`/customers/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        const customer = response.data;
        this.setState({ customer });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center mt-5">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Name:-{this.state.customer.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Email:-
              {this.state.customer.email}
            </h6>
            <p className="card-text">
              Mobile Number:-{this.state.customer.mobile}
            </p>
            <Link className="btn btn-primary card-link" to="/customers">
              Back
            </Link>
            <Link
              className="btn btn-primary card-link"
              to={`/customers/edit/${this.state.customer._id}`}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

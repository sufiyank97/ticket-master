import React from "react";
import { startSetUser } from "../../actions/user";
import { connect } from "react-redux";
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.dispatch(startSetUser(formData));
    this.props.history.push("/");
    console.log("yes");
  }
  render() {
    return (
      <div className="row h-100 justify-content-center align-items-center">
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          <div className="form-group">
            <label>
              Email
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                className="form-control"
                required
                pattern=".+@gmail.com"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Password
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                className="form-control"
                required
              />
            </label>
          </div>
          <input type="submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}
export default connect()(Login);

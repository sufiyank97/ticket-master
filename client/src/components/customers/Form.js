import React from "react";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("form customer");
    this.state = {
      name: props.customer ? props.customer.name : "",
      email: props.customer ? props.customer.email : "",
      mobile: props.customer ? props.customer.mobile : ""
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
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile
      // id: this.props.customer._id
    };

    // we want to create an id property only while editing and not creating a user, this is determined based on if the component has recieved a customer prop
    this.props.customer && (formData.id = this.props.customer._id);

    console.log(formData);
    this.props.handleCustomerSubmit(formData);
  }
  // componentDidMount(){
  //     console.log(nextProps.customer,"edit")
  // }
  // componentWillReceiveProps(nextProps){
  //     console.log('form customer will receive props', nextProps)
  //     const { name, email, mobile } = nextProps.customer
  //     this.setState({ name, email, mobile  })
  // }

  render() {
    console.log("form customer render");

    return (
      <div className="row h-100 justify-content-center align-items-center">
        <form onSubmit={this.handleSubmit}>
          {this.props.customer === undefined ? (
            <h3>Add Customer</h3>
          ) : (
            <h3>Edit Customer</h3>
          )}

          <div className="form-group">
            <label>
              Name
              <input
                type="text"
                value={this.state.name}
                className="form-control"
                onChange={this.handleChange}
                name="name"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Email
              <input
                type="email"
                value={this.state.email}
                className="form-control"
                onChange={this.handleChange}
                name="email"
                required
                pattern=".+@gmail.com"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Mobile
              <input
                type="tel"
                value={this.state.mobile}
                className="form-control"
                onChange={this.handleChange}
                name="mobile"
                required
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              />
            </label>
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </div>
    );
  }
}

export default CustomerForm;

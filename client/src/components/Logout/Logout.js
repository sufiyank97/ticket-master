import React from "react";
import { connect } from "react-redux";
import axios from "../../config/axios";
// import { Redirect, useHistory } from "react-router-dom";
import { resetUser } from "../../actions/user";
// export default function Logout() {
//     // axios.delete("/logout")
//     // let history = useHistory()
//     localStorage.clear()
//     // history.push('/')

//     return (
//         <Redirect to="/register"/>
//     )

// }
class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      logout: false
    };
  }
  componentDidMount() {
    axios
      .delete("/users/logout", {
        headers: {
          "x-auth": localStorage.getItem("authToken")
        }
      })
      .then(response => {
        localStorage.removeItem("authToken");
        // localStorage.clear()
        console.log(response.data);

        this.props.dispatch(resetUser());
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
    // localStorage.removeItem('authToken')
    // // this.props.history.push("/")
    // const logout=true
    // console.log(logout)
    // this.setState({logout},()=>{
    //     console.log(this.state.logout,"dfsd")
    // })
    // window.location.reload()
  }
  render() {
    // return(
    //     <div>

    //     </div>
    // )
    return (
      <div>
        <p>logging out..</p>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Logout);

import Axios from "axios";
const axios = Axios.create({
  //  baseURL:'https://dct-ticket-master.herokuapp.com'
  //  baseURL:'http://localhost:3004'
  baseURL: "/"
});
export default axios;

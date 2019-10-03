import axios from "axios";
const headers = {
  "Content-Type": "application/json"
};
const url = "http://localhost:8000";

export default {
  login: function(email, password) {
    return axios.post(
      `${url}/user/login`,
      {
        email,
        password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(`${url}/user/signup`, send, { headers: headers });
  },

  isLogged: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  }
};
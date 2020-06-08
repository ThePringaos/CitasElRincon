import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.48:8000",
  headers: {
    "Content-type": "application/json"
  }
});
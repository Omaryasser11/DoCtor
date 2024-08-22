import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://dina-khairy.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default baseUrl;

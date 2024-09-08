import axios from "axios";

// Retrieve the token from local storage
const token = localStorage.getItem("token");

const baseUrl = axios.create({
  baseURL: "http://dina-khairy.com",
  headers: {
    Authorization: `Bearer ${token}` // Use the token from local storage

  },
});

export default baseUrl;

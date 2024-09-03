import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlM2UxNmViLWQyODktNGI5MS1iNzUzLTgyZWY5M2U2ZmY1YyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTcyNTQyMjEzNSwiaXNzIjoiaHR0cHM6Ly93d3cuaWJyYWhpbS5jb20ifQ.w0hcdWvrpUH5zXWLStUDHu4IRJx_o_oQ8T0ehXsmRUU'
const baseUrl = axios.create({
  baseURL: "http://dina-khairy.com",
  headers: {
    // Authorization: `Bearer ${localStorage.getItem("token")}`,
    Authorization: `Bearer ${token}`
  },
});

export default baseUrl;

import axios from "axios";

const apiUrl = `http://localhost:3500/api`;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export const axiosInstanceAuth = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: localStorage?.getItem("token"),
  },
});

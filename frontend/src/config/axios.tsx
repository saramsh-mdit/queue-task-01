import axios from "axios";

const apiUrl = import.meta.env.VITE_API;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export const axiosInstanceAuth = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: localStorage?.getItem("token"),
  },
});

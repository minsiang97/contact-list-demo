import axios from "axios";

const Axios = axios.create({
  headers: {
    Accept: "application/json,application/x-www-form-urlencoded,text/plain,*/*",
    "Content-Type": "application/json;charset=utf-8",
  },
});

// Add a response interceptor
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default Axios;

import Swal from "sweetalert2";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  // timeout: 1000,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // add token to header
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) => {
    console.log("err", error);
    console.log("err.message", error.message);

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Swal.fire({
      heightAuto: false,
      icon: "error",
      title: `Status: ${error.response.data.status}`,
      text: error.response.data.message,
    });
    return Promise.reject(error);
  }
);

export default apiClient;

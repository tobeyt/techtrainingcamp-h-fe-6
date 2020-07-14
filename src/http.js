import axios from "axios";
import Vue from "vue";
import router from "./router";

const http = axios.create({
  baseURL: "https://afxltd.fn.thelarkcloud.com/",
});

http.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.token) {
      config.headers.Authorization = "Bearer " + localStorage.token;
    }
    return config;
  },
  (err) => {
    // Do something with request error
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (res) => {
    console.log(res)
    return res;
  },
  (err) => {
    console.log(`111`, err);
    if (err.response.status === 423) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });

      if (err.response.status === 401) {
        router.push("/");
      }
    }
    return Promise.reject(err);
  }
);

export default http;

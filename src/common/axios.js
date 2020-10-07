import Vue from "vue";
import axios from "axios";
import router from "../router";
import $Message from "view-design/src/components/message";
import Qs from "qs";

Vue.prototype.qs = Qs;
Vue.prototype.axios = axios;

Vue.prototype.baseUrl = "/api";
//Vue.prototype.webSocketUrl = "ws://192.168.52.129:9999/";
//测试生产
Vue.prototype.webSocketUrl = "ws://127.0.0.1:8888/";

axios.defaults.baseURL = Vue.prototype.baseUrl;
axios.defaults.headers = {
    "Content-Type": "application/json;charset=UTF-8"
};
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    let headers = response.headers;
    if (headers["content-type"] === "application/json" || headers["content-type"] === "application/json;charset=UTF-8") {
        let data = response.data;
        if (data.code !== 200) {
            if (data.code === 10001) {
                router.push({path: "/login"});
            } else {
                $Message.error(data.message);
            }
        }
    }
    return response;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
});

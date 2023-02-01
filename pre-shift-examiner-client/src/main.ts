import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router";
import axios from "axios";

axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return error.response.data;
});

const app = createApp(App);
app.use(router);
app.mount('#app');



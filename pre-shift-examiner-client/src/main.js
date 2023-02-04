import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/router";
import axios from "axios";
import { ErrorMessages } from "pre-shift-examiner-types";
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    if (error.code === "ERR_NETWORK") {
        throw ({ message: ErrorMessages.SERVER_ERROR });
    }
    return error.response.data;
});
const app = createApp(App);
app.use(router);
app.mount('#app');
//# sourceMappingURL=main.js.map
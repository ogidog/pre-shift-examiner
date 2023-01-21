import {createApp} from 'vue'
import App from './App.vue'
import router from "./router/router";
import {useAxiosIntersect} from "@/composables/composable";

useAxiosIntersect();

const app = createApp(App);
app.use(router);
app.mount('#app');



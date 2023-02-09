import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/router";
const app = createApp(App);
app.directive('uppercase', (el) => {
    if (el.tagName === "INPUT" && el.getAttribute("type") === "text")
        el.value = el.value.toUpperCase();
});
app.use(router);
app.mount('#app');
//# sourceMappingURL=main.js.map
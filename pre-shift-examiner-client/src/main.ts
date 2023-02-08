import {createApp, onMounted} from 'vue'
import App from './App.vue'
import router from "./router/router";

const app = createApp(App);

app.directive('uppercase', (el) => {
    if (el.tagName === "INPUT" && el.getAttribute("type") === "text") el.value = el.value.toUpperCase();
});

// app.directive("enterdown", (el, binding) => {
//     el.addEventListener("keydown", (e: KeyboardEvent) => {
//             if (e.key === "Enter") {
//                 console.log((<HTMLElement>e.target).tagName)
//                 // binding.value();
//             }
//         },
//         true
//     );
// });

app.use(router);
app.mount('#app');



import { reactive } from 'vue';
import axios from "axios";
import router from "@/router/router";
export const store = reactive({
    personnelId: "НИ00-0011",
    async startTesting() {
        const user = await axios.get("http://pre-shift-examiner-server.local/api/auth/login", {
            params: {
                personnel_id: store.personnelId
            }
        });
        if (user) {
            router.push({ path: "/testing" });
        }
    }
});
//# sourceMappingURL=store.js.map
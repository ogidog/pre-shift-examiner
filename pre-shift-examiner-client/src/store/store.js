import {reactive} from 'vue'
import axios from "axios";


export const store = reactive({
    personnelId: "НИ00-0011",
    user: null,

    async startTesting() {
        let user = await axios.get("http://pre-shift-examiner-server.local/api/auth/login",
            {
                params: {
                    personnel_id: store.personnelId
                }
            });

        if (user) {
            this.$router.push({path: "/testing"})
        }
    }
});

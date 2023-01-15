import {reactive} from 'vue'

// eslint-disable-next-line no-unused-vars
const getQuestions = () => {
}
const login = () => {
}

export const store = reactive({
    personnelid: "НИ00-0011",

    startTesting() {
        login()
        this.$router.push({path: "/testing"})
    }
});

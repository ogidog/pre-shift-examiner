import {minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {userStore} from "@/store";

const rules = {
    user: {
        personnelId: {required, minLength: minLength(5)},
    },
};

export const userValidator = useVuelidate(rules, userStore);


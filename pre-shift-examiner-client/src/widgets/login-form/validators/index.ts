import {helpers, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {userStore} from "@/store";


const rules = {
        user: {
            personnelId: {
                required: helpers.withMessage("Табельный номер обязателен", required),
                minLength: helpers.withMessage("Минимальная длина номера 5 символов", minLength(5)),
            },
        }
    }

export const userValidator = useVuelidate(rules, userStore);


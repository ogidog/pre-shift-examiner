<template>
  <div class="c-personnel-id">
    <input class="c-personnel-id__input" type="text" v-model="userStore.user.personnelId" v-uppercase
           autofocus maxlength="16"/>
    <label v-if="userValidator.$error"
           class="c-personnel-id__label c-personnel-id__label_error">{{
        userValidator.user.personnelId.$errors[0].$message
      }}</label>
    <label v-else class="c-personnel-id__label">Введите табельный номер:</label>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "@/store";
import {userValidator} from "@/widgets/login-form/validators";
import {onMounted, onUnmounted} from "vue";

onUnmounted(() => userValidator.value.$reset())

</script>

<style scoped>

.c-personnel-id {
  display: flex;
  justify-content: center;

  position: relative;

  width: fit-content;
  margin-right: 10px;
}

.c-personnel-id__label {
  position: absolute;
  top: 5px;
  left: 10px;

  color: #bdbdbd;

  font-family: "PTC55F";
  font-size: 0.8rem;
  font-weight: bold;
}

.c-personnel-id__label_error {
  color: red;
}

.c-personnel-id__input {

  width: 310px;
  height: 35px;

  padding-top: 20px;
  padding-left: 5px;

  color: #212529;
  background-color: #fff;

  border: 1px solid #bdbdbd;
  border-radius: 6px;

  font-family: "Days";
  font-size: 1.2em;
}

.c-personnel-id__input:focus {
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}

</style>

<!--suppress ALL -->
<template>
  <div class="c-personnel-id">
    <input class="personnel-id-container__input" type="text" v-model="userStore.user.personnelId" autofocus/>
    <label class="personnel-id-container__label">Введите табельный номер:</label>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "@/store";
</script>

<style scoped>

.c-personnel-id {
  display: flex;
  justify-content: center;

  position: relative;

  width: fit-content;
  margin-right: 10px;
}

.personnel-id-container__label {
  position: absolute;
  top: 5px;
  left: 10px;

  color: #bdbdbd;

  font-family: "PTC55F";
  font-size: 0.8rem;
  font-weight: bold;
}

.personnel-id-container__input {

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

.personnel-id-container__input:focus {
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}

</style>

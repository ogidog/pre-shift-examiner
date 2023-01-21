<template>
  <div class="personnel-id_container__div">
    <input class="personnel-id__input" type="text" v-model="store.user.personnelId" autofocus/>
    <label class="personnel-id__label">Введите табельный номер:</label>
  </div>
</template>

<script lang="ts">
import {store} from "@/store/store";

export default {
  name: "PersonnelidInput",

  setup() {
    return {
      store
    }
  }
}
</script>

<style scoped>

.personnel-id_container__div {
  display: flex;
  justify-content: center;

  margin: 5px;

  position: relative;

  width: fit-content;
}

.personnel-id__label {
  position: absolute;
  top: 5px;
  left: 10px;

  color: #bdbdbd;

  font-family: Arial;
  font-size: 0.8rem;
}

.personnel-id__input {

  width: 310px;
  height: 35px;

  padding-top: 20px;
  padding-left: 5px;

  color: #212529;
  background-color: #fff;

  border: 1px solid #bdbdbd;
  border-radius: 6px;

  font-family: Arial;
  font-size: 1.2em;
}

.personnel-id__input:focus {
  border-color: #bdbdbd;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(158, 158, 158, 0.25);
}

</style>

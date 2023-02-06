<template>
  <div v-if="props.charCode === 8" class="c-button c-button_enter" @click="deleteClickHandler">
    &#129056;
  </div>
  <div class="c-button" v-else @click="charClickHandler">
    {{ String.fromCharCode(props.charCode).toUpperCase() }}
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {userStore} from "@/store";

const props = defineProps({charCode: {type: Number, required: true}});

const deleteClickHandler = () => {
  if (userStore.user.personnelId) userStore.setPersonnelId(userStore.user.personnelId.slice(0, -1));
}

const charClickHandler = () => {
  if (!userStore.user.personnelId) userStore.setPersonnelId("");
  userStore.setPersonnelId(userStore.user.personnelId + String.fromCharCode(props.charCode).toUpperCase());
}

</script>

<style scoped>
.c-button {

  margin: 3px;

  width: 45px;
  height: 45px;

  text-align: center;
  line-height: 45px;

  font-family: PTC55F;
  font-size: 1.3em;
  color: #030303;

  background-color: white;
  border-radius: 2px;
  border: 1px solid gray;

  cursor: pointer;
}

.c-button_enter {
  font-weight: bold;
  background-color: #5488f1;
  color: white;
}
</style>

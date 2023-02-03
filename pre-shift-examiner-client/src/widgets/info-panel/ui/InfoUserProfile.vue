<template>
  <div class="c-profile">
    {{ `${surname} ${name[0]}. ${patronymic[0]}.` }}
  </div>
</template>

<script setup lang="ts">
import {userStore} from "@/store";
const {surname, name, patronymic} = userStore.user;

</script>

<style scoped>
.c-profile {
  width: 40%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  margin: 5px;

  font-family: Days;
  color: #8c8a8a;

}
</style>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: 'App',
})
</script>

<style>
body {
  margin: 0;
}
.container {
  width: 100vw;
  height: 100vh;
  border: 0px solid red;
}
</style>

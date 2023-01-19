<template>
  <div class="container">
    <PersonnelidInput/>
    <StartTestingButton/>
  </div>
</template>

<script lang="ts">

import PersonnelidInput from "@/components/login/PersonnelidInput.vue";
import StartTestingButton from "@/components/login/StartTestingButton.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoginForm",
  components: {PersonnelidInput, StartTestingButton}
});
</script>

<style scoped>

@media (max-width: 1024px) {
  .container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    border: 0px solid red;
  }
}

@media (min-width: 1025px) {
  .container {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    width: 1025px;
    height: fit-content;

    border: 0px solid red;
  }
}

</style>

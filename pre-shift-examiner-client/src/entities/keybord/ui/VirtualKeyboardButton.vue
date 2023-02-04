<template>
  <div v-if="props.charCode === 8" class="c-button c-button_enter">
    &#129056;
  </div>
  <div class="c-button" v-else>
    {{ String.fromCharCode(props.charCode).toUpperCase() }}
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({charCode: {type: Number, required: true}});

</script>

<style scoped>
.c-button {
  width: fit-content;
  height: fit-content;

  margin: 3px;

  width: 40px;
  height: 40px;

  text-align: center;
  line-height: 40px;

  font-family: PTC55F;
  font-size: 1.3em;
  color: #030303;

  background-color: white;
  border-radius: 2px;
  border: 1px solid gray;
}

.c-button_enter {
  font-weight: bold;
  background-color: #5488f1;
  color: white;
}
</style>

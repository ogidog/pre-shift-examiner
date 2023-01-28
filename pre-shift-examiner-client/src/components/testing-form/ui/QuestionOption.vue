<template>
  <div class="option-container" @click="optionCheckHandler">
    <input :id="this.$props.option.id" :type="this.$props.type" :value="this.$props.option.id" name="option"/>
    <label :for="this.$props.option.id">
      {{ this.$props.option.content }}
    </label>
  </div>
</template>

<script setup lang="ts">
import {IOption} from "pre-shift-examiner-types/index";
import {defineProps, PropType} from "vue";

const props = defineProps({option: {} as PropType<IOption>, type: {} as PropType<'checkbox' | 'radio'>});

const optionCheckHandler = (event: Event) => {
  let targetElem = event.target as HTMLElement;
  if (targetElem.tagName === "INPUT") {
    console.log(targetElem.getAttribute("value"))
  }
}

</script>

<style scoped>
.option-container {
  display: flex;
  align-items: center;

  width: 95%;

  margin-top: 7px;
  margin-bottom: 7px;

}

.option-container * {
  cursor: pointer;
}

.option-container label {
  font-size: 1.2em;
  font-family: "PTC55F";
  font-weight: lighter;

  margin-left: 7px;
}

.option-container input {
  margin: 0px !important;
  zoom: 2.0;
}

</style>

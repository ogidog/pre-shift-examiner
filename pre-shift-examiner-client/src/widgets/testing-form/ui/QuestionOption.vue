<template>
  <div class="c-option">
    <input :id="props.option.id" :type="props.type" :value="props.option.id" name="option"/>
    <label :for="props.option.id">
      {{ props.option.content }}
    </label>
  </div>
</template>

<script setup lang="ts">
import {IOption} from "pre-shift-examiner-types/index";
import {defineProps, PropType} from "vue";
import {testingStore} from "@/store";

const props = defineProps({
  option: {} as PropType<IOption>,
  type: {} as PropType<'checkbox' | 'radio'>
});

</script>

<style scoped>
.c-option {
  display: flex;
  align-items: center;


  width: 95%;
  height: max-content;
  min-height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;

  border: 1px solid lightgrey;

  background: rgb(206, 222, 240);
  background: linear-gradient(270deg, rgba(206, 222, 240, 1) 0%, rgba(239, 241, 245, 0.20211834733893552) 83%);

}

.c-option label {
  width: 100%;
}

.c-option * {
  cursor: pointer;
}

.c-option label {
  font-size: 1.2em;
  font-family: "PTC55F";
  font-weight: lighter;

  margin-left: 7px;
}

.c-option input {
  margin: 0px !important;
  zoom: 2.0;
}

</style>

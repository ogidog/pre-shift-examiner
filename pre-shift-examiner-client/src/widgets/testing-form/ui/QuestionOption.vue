<template>
  <div class="c-option">
    <input :id="this.$props.option.id" :type="this.$props.type" :value="this.$props.option.id" name="option"/>
    <label :for="this.$props.option.id">
      {{ this.$props.option.content }}
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
  margin-top: 10px;
  margin-bottom: 10px;

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

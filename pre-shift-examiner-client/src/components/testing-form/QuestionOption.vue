<template>
  <div class="option-container">
    <input :id="this.$props.option.id" :type="this.$props.type" :value="this.$props.option.id" name="option"/>
    <label :for="this.$props.option.id">
      {{ this.$props.option.content }}
    </label>
  </div>

</template>

<script lang="ts">
import {Option} from "pre-shift-examiner-middleware";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "QuestionOption",
  props: {option: {} as PropType<Option>, type: {} as PropType<'checkbox' | 'radio'>}
})

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

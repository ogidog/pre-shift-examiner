<template>
  <div class="option-container">
    <div v-if="this.$props.type==='checkbox'" class="option-container__checkbox">
      <input :id="this.$props.option.id" type="checkbox" :value="this.$props.option.id"/>
      <label :for="this.$props.option.id">
        <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px">
          <rect x="10" y="10" width="30" height="30" rx="5" ry="5" fill="none" stroke-width="2" stroke="black"/>
          <path d="M5,10 l25,50" fill="none" stroke="black" stroke-width="5"/>
        </svg>
        {{ this.$props.option.content }}
      </label>
    </div>
  </div>

</template>

<script lang="ts">
import {Option} from "pre-shift-examiner-middleware";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "QuestionOption",
  props: {option: {} as PropType<Option>, type: {} as PropType<'checkbox' | 'radiobutton'>}
})

</script>

<style scoped>
.option-container {
  width: 90%;
  font-family: "PTC55F";
  font-weight: lighter;
  font-size: 1.2em;

  margin-top: 10px;
  margin-bottom: 10px;
}

.option-container__checkbox {

}

</style>

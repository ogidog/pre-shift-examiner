<template>
  <div class="option-container">
    <div v-if="this.$props.type==='checkbox'" class="option-container__checkbox">
      <input :id="this.$props.option.id" type="checkbox" :value="this.$props.option.id"/>
      <label :for="this.$props.option.id">
        {{ this.$props.option.content }}
      </label>

      <!--      <div class="checkbox-wrapper-23">-->
      <!--        <input type="checkbox" id="check-23"/>-->
      <!--        <label for="check-23" style="&#45;&#45;size: 30px">-->
      <!--          <svg viewBox="0,0,50,50">-->
      <!--            <path d="M5 30 L 20 45 L 45 5"></path>-->
      <!--          </svg>-->
      <!--        </label>-->
      <!--      </div>-->
    </div>
    <div>
      <input id="box1" type="checkbox" />
      <label for="box1">Checkbox 1</label>
      <input id="box2" type="checkbox" />
      <label for="box2">Checkbox 2</label>
      <input id="box3" type="checkbox" />
      <label for="box3">Checkbox 3</label>
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

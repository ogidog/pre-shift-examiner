<template>
  <div class="option-container"></div>
</template>

<script lang="ts">
import {Option} from "pre-shift-examiner-middleware";
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "QuestionOption",
  props: {option: {} as PropType<Option>}
})

</script>

<style scoped>
.option-container {
  width: 90%;
}
</style>

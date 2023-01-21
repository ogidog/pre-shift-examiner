<template>
  <section>
    {{ this.$props.question.content }}
  </section>
</template>

<script lang="ts">

// interface Question {
//   id: number,
//   content: string,
//   options: { id: number, content: string }[],
// }

// @ts-ignore
import {Question} from "pre-shift-examiner-middleware";

import {defineComponent, PropType} from "vue";

export default defineComponent({

  name: "QuestionContainer",
  props: {question: Object as PropType<Question>}

})
</script>

<style scoped>

</style>

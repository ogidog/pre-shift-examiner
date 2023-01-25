<template>
  <button @click="()=>this.store.currentQuestionIndex++"
          v-show="this.store.questions.length>1 && this.store.currentQuestionIndex<this.store.questions.length-1">
    Далее
  </button>
</template>

<script>
export default {
  name: "NextQuestionButton",

}
</script>

<style scoped>
button {
  background-color: #5488f1;
  border-radius: 8px;
  border-width: 0;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  font-family: "PTC55F";
  font-weight: bold;
  font-size: 1.1em;
  line-height: 20px;
  list-style: none;
  margin: 5px;
  padding: 10px 12px;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
}
</style>

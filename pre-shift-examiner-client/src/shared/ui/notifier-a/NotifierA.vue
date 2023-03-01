<template>
  <div class="c-notifier" v-if="uiStore.notifier.visible">
    <div class="c-notifier__div"
         :style="uiStore.notifier.error?{'color':'rgba(252, 16, 16, 0.48)'}:{'color':'lightgrey'}"
         @click="(event) => event.stopPropagation()"
    >
      {{ uiStore.notifier.message }}
    </div>
    <ButtonA class="c-notifier__ButtonA" text="Закрыть" v-show="uiStore.notifier.error"
             @click="() => uiStore.notifier = {visible: false}"/>
  </div>
</template>

<script setup lang="ts">
import {uiStore} from "@/store";
import {ButtonA} from "@/shared/ui/button-a";

</script>

<style scoped>
.c-notifier {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: white;
}

.c-notifier__div {
  font-family: "Days";
  font-weight: bold;
  font-size: 1.1em;
  color: lightgrey;

  text-align: center;
  word-break: break-all;

  width: 90%;
}

.c-notifier__ButtonA {
  margin-top: 20px;
}
</style>

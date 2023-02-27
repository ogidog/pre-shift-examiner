<template>
  <div class="c-logo">
    <div>Пред<span class="c-logo__span-cap-letter">С</span>менный</div>
    <div><span class="c-logo__span-cap-letter">Э</span>кзаменатор</div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.c-logo {
  display: flex;
  align-items: center;
  flex-direction: column;

  position: absolute;
  font-family: Days;

  font-size: 200%;

  top: 10px;
  width: 100%;
  height: 30%;
}



.c-logo__span-cap-letter {
  font-family: Days;
  font-size: 1.4em;

  margin-left: 2px;
  margin-right: 2px;
  color: #5488f1;
}


</style>

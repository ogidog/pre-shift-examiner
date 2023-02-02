<template>
  <div class="c-app">
    <router-view></router-view>
  </div>
</template>

<style>

@font-face {
  font-family: "Days";
  src: local("Days"),
  url(./assets/fonts/days/Days.ttf) format("truetype");
}

@font-face {
  font-family: "PTC55F";
  src: local("PTC55F"),
  url(./assets/fonts/PT/PTC55F.ttf) format("truetype");
}

@font-face {
  font-family: "PTC75F";
  src: local("PTC55F"),
  url(./assets/fonts/PT/PTC75F.ttf) format("truetype");
}

body {
  margin: 0;
}
.c-app {
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div>
    <header-l />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderL from './components/HeadL'
export default {
  name: 'App',
  components: {
    HeaderL
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body, html {
  overflow-x: hidden;
}

body {
  background: url('../static/bg_3.jpg');
  font-family: yaya, 'Times New Roman', Georgia, Serif;
}

@font-face {
  font-family: yaya;
  src: url('../static/fonts/fat3.otf');
}
</style>

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
  background: -webkit-radial-gradient(circle, #b1d5e1, #e2e7e8);
  background: -o-radial-gradient(circle, #b1d5e1, #e2e7e8);
  background: -moz-radial-gradient(circle, #b1d5e1, #e2e7e8);
  background: radial-gradient(circle, #b1d5e1, #e2e7e8);
  font-family: yaya, 'Times New Roman', Georgia, Serif;
}

@font-face {
  font-family: yaya;
  src: url('../static/fonts/fat3.otf');
}
</style>

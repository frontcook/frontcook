<template>
  <div>
    <header-l />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderL from './components/HeadL'
import MainL from './components/MainL'
import FooterL from './components/FooterL'
export default {
  name: 'App',
  components: {
    HeaderL,
    MainL,
    FooterL
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
  background-color: #eeeeee;
  font-family: 'yaya'
}

@font-face {
  font-family: 'yaya';
  src: url('../static/fonts/肥滚滚.ttf');
}
</style>

<template>
  <div>
    <header-l />
    <main-l />
    <footer-l />
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
</style>

<template>
  <div class="title">
    <span class="title-book-list">{{msg}}</span>
  </div>
</template>

<script>
export default {
  name: 'first-title',
  data () {
    return {
      msg: '书单'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    height: 200px;
    line-height: 200px;
    text-align: center;
    background-image: url('../../static/title.jpg');
  }

  .title-book-list {
    padding-top: 20px;
    font-size: 40px;
    color: #ffffff;
    display: block;
  }
</style>

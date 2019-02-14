<template>
  <div class="title">
    <ul class="title-book-list">
      <li v-for="(menu, index) in menus" :key="index" :class="{'menu-actived': $route.path === menu.path}">
        <router-link :to="menu.path">{{menu.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'first-title',
  data () {
    return {
      menus: [
        {name: '主页', path: '/'},
        {name: '书单', path: '/book'},
        {name: '管理系统', path: '/theme'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    height: 150px;
    position: relative;
  }

  .title-book-list {
    color: #ffffff;
    height: 50px;
    line-height: 50px;
    display: flex;
    position: absolute;
    top: 20px;
    left: 40px;
  }
  .title-book-list li {
    list-style: none;
    font-family: "黑体";
    font-weight: bold;
    font-size: 16px;
    margin-right: 30px;
  }
  .title-book-list li a {
    text-decoration: none;
    color: #44232f;
  }
  .menu-actived {
    font-size: 20px !important;
    color: #44232e;
  }
</style>

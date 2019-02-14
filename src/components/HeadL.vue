<template>
  <div class="title">
    <ul class="title-book-list">
      <li v-for="(menu, index) in menus" :key="index">
        <router-link :to="menu.path" exact class="default-a">{{menu.name}}</router-link>
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
    height: 30px;
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
  .title-book-list li .default-a {
    text-decoration: none;
    color: #6a7077;
  }

  .router-link-active {
    padding-bottom: 3px;
    color: #393c40 !important;
    border-bottom: 2px solid rgb(51,136,255);
  }
</style>

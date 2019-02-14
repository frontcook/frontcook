<template>
  <ul class="theme-wrapper">
    <li v-for="(item, index) in theme"
      @click="returnUrl(item.github)"
      class="theme-list" :key="index">
      <div>
        <img :src="'static/items/' + item.url" alt="" width="320" height="211">
      </div>
      <div>
        <span>{{item.name}}</span>
      </div>
      <iframe :src="'https://ghbtns.com/github-btn.html?user=' + item.usr + '&repo=' + item.name + '&type=star&count=true'" frameborder="0" scrolling="0" width="150px" height="20px"></iframe>
    </li>
  </ul>
</template>
<script>
import theme from '../themeStore'
export default {
  name: 'theme',
  data () {
    return {
      theme
    }
  },
  methods: {
    returnUrl (url) {
      window.open(url)
    }
  }
}
</script>

<style scoped>
.theme-wrapper {
  width: 900px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
}

.theme-list {
  width: 40%;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  padding: 20px;
  list-style: none;
  margin: 20px 5%;
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;
}

.theme-list iframe {
  margin-top: 5px;
}

.theme-list:hover {
  box-shadow: 0 2px 4px 4px rgba(0, 0, 0, 0.1);
}
</style>

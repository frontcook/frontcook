<template>
  <div>
    <div ref="marked" class="wrapper-marked"></div>
    <el-button
      type="primary"
      icon="el-icon-arrow-up"
      circle
      :style="{display: flag}"
      @click="toTop"
      class="to-top"></el-button>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'Opensource',
  mounted () {
    this.init()
    this.$http.get('static/resource/Readme.md')
      .then(res => {
        this.$refs.marked.innerHTML = marked(res.data)
      })
  },
  data () {
    return {
      flag: 'none'
    }
  },
  methods: {
    toTop () {
      let timer = setInterval(function () {
        const top = document.documentElement.scrollTop
        const speed = top / 4
        if (top <= 0) {
          clearInterval(timer)
        }
        document.documentElement.scrollTop -= speed
      }, 10)
    },
    init () {
      const _this = this
      window.onscroll = function () {
        const backtop = document.documentElement.scrollTop
        if (backtop > 800) {
          _this.flag = 'block'
        } else if (backtop < 400) {
          _this.flag = 'none'
        }
      }
    }
  }
}
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
  .wrapper-marked {
    width: 1000px;
    margin: auto;
  }
  .wrapper-marked > h2 {
    font-size: 16px;
  }
  .wrapper-marked > ul {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }
  .wrapper-marked ul:nth-child(2) > li {
    width: 150px;
    font-size: 12px;
    font-weight: bold;
  }
  .wrapper-marked ul:not(:nth-child(2)) {
    border-radius: 20px;
    background: #ffffff;
    margin: 20px auto;
    box-shadow: 0 4px 4px 0 #cccccc;
  }
  .wrapper-marked ul:not(:nth-child(2)) > li {
    border-radius: 20px;
    color: #0366d6;
    font-weight: bold;
    text-shadow: 2px 2px #cccccc;
  }
  .wrapper-marked ul:nth-child(2) > li > a:visited,
  .wrapper-marked ul:nth-child(2) > li > a:link,
  .wrapper-marked ul:nth-child(2) > li > a:active {
    color: #888888;
  }
  .wrapper-marked ul:not(:nth-child(2)) > li > a,
  .wrapper-marked ul:not(:nth-child(2)) > li > p > a {
    color: #0366d6;
    text-decoration: none;
    text-shadow: 2px 2px #cccccc;
    font-weight: bold;
  }
  .wrapper-marked > ul > li {
    list-style: none;
    width: 300px;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 10px 15px;
    padding: 20px;
    text-align: center;
  }

  .wrapper-marked > ul > li > a {
    text-decoration: none;
  }
  .wrapper-marked > ul > li > p {
    font-family: 'yaya';
    font-weight: bold;
    color: #444444;
  }
  .to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  #目录 {
    font-size: 20px;
  }
</style>

<template>
  <div class="detail-wrapper">
    <el-button
      v-if="flagdata"
      type="primary"
      icon="el-icon-caret-left"
      @click="backList"
      size="mini" circle></el-button>
    <div ref="mdData" class="data-wrapper"></div>
  </div>
</template>
<script>
import marked from 'marked'
export default {
  name: 'detail-id',
  data () {
    return {
      flagdata: false
    }
  },
  mounted () {
    this.$http.get(`${this.apiUrl}api/v1/back/opensource/detail`, {
      params: {id: this.$route.params.id}
    })
      .then(res => {
        this.$refs.mdData.innerHTML = marked(res.data)
        this.flagdata = true
        const aList = Array.from(document.getElementsByTagName('a'))
        for (let i = 0; i < aList.length; i++) {
          aList[i].target = '__blank'
        }
      })
  },
  methods: {
    backList () {
      this.$router.push({path: '/opensource'})
    }
  },
  destroyed () {
    this.flagdata = false
  }
}
</script>
<style scope>
  .detail-wrapper {
    width: 800px;
    margin: 40px auto;
  }

  .data-wrapper {
    margin-top: 10px;
  }
  .detail-wrapper ul {
    display: flex;
    flex-wrap: wrap;
  }
  .detail-wrapper ul li {
    list-style: none;
    width: 30%;
    margin: 20px 1%;
    border-radius: 20px;
    padding: 20px;
    background: #cccccc;
    box-sizing: border-box;
    box-shadow: 0 2px 2px 0 #888888;
  }
  .detail-wrapper ul li a {
    color: #c10e0e;
    text-align: center;
    display: block;
    text-decoration: none;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
  }
  .detail-wrapper ul li a:visited {
    outline: 0;
  }
  .detail-wrapper ul li a:hover {
    text-shadow: 1px 1px 1px #653939;
  }
</style>

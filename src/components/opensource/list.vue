<template>
  <div>
    <div ref="marked" class="wrapper-marked">
      <ul>
        <li v-for="dat in datas" :key="dat.key" @click="getSelect(dat.key)">
          {{dat.name}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  mounted () {
    this.$http.get(`${this.apiUrl}api/v1/back/opensource/list`)
      .then(res => {
        this.datas = res.data.list
      })
  },
  data () {
    return {
      flag: 'none',
      datas: []
    }
  },
  methods: {
    getSelect (key) {
      this.$router.push({path: `/opensource/detail/${key}`})
    }
  }
}
</script>
<style scoped>
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
  .wrapper-marked ul li {
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    list-style: none;
    width: 200px;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 10px 15px;
    padding: 20px;
    text-align: center;
  }
  .wrapper-marked ul li:hover {
    text-shadow: 2px 1px 2px #888888;
  }
  .wrapper-marked ul li:hover::before {
    content: '[';
    margin-right: 5px;
  }
  .wrapper-marked ul li:hover::after {
    content: ']';
    margin-left: 5px;
  }
  #目录 {
    font-size: 20px;
  }
</style>

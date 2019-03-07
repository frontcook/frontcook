<template>
<div>
  <div class="search">
    <div class="search-button-wrapper" >
      <span class="label">热门标签：</span>
      <el-button
        type="info"
        size="mini"
        @click="choiceLang(item.key)"
        :class="{isactived: item.key === flagKey}"
        round v-for="item in langArr"
        :key="item.key">
        {{item.name}}
      </el-button>
    </div>
    <div class="search-input-wrapper">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="inputbook"></el-input>
    </div>
  </div>
  <div class="book-content-wrapper">
    <ul class="main-book-lists">
      <li v-for="(book, item) in bookStoreRender" :key="item">
        <div>
          <img :src="'static/bookimg/' + book.img" width="150" height="189">
        </div>
        <div class="book-name-wrapper">
          <span class="book-name" :title="book.name">{{book.name}}</span>
          <el-button type="info" icon="el-icon-download" circle @click.stop="returnLoadUrl(book.url)" ></el-button>
        </div>
      </li>
      <div class="book-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="9"
          @current-change="currentChangeHandler"
          :total="bookNum"></el-pagination>
      </div>
    </ul>
    <div class="book-content-right">
      <div class="right-1">
        <span>
          仅供学习使用!如有侵权,
          请发送邮件至442747096@qq.com.
          会在72小时之内处理,谢谢!
        </span>
      </div>
      <div class="right-2">
        <div class="thank">感谢支持</div>
        <img src="static/wx.jpg" width="100%">
      </div>
      <div class="right-3">
        如有链接失效问题,请联系上诉邮箱!
      </div>
    </div>
  </div>

</div>
</template>

<script>
// bookStore 为全部数据, bookStoreRender 为当前页渲染的数据, bookStoreSearch 为当前选择项下的所有数据
// import bookStore from '../bookStore'
export default {
  name: 'main-l',
  mounted () {
    this.$http.get(`${this.apiUrl}api/v1/back/booklist`)
      .then(res => {
        this.bookStore = res.data
        this.initPage()
      })
  },
  data () {
    return {
      bookStore: [],
      bookStoreRender: [],
      bookStoreSelect: [],
      inputbook: '',
      bookNum: 0,
      langArr: [
        {name: '全部', key: 'all'},
        {name: 'c/c++', key: 'c/c++'},
        {name: 'java', key: 'java'},
        {name: '前端', key: 'js'},
        {name: 'python', key: 'python'},
        {name: 'go', key: 'go'}
      ],
      flagKey: 'all'
    }
  },
  watch: {
    inputbook (val) {
      this.searchInputHandler(val)
    }
  },
  methods: {
    returnLoadUrl (url) {
      window.open(url)
    },
    currentChangeHandler (pageNum) {
      this.bookStoreRender = this.bookStoreSelect.slice((pageNum - 1) * 9, pageNum * 9)
    },
    initPage () {
      this.bookNum = this.bookStore.length
      this.bookStoreSelect = JSON.parse(JSON.stringify(this.bookStore))
      this.bookStoreRender = this.bookStore.slice(0, 9)
    },
    choiceLang (lang) {
      this.inputbook = ''
      this.flagKey = lang
      this.searchBtnHandler(lang)
    },

    searchInputHandler (val) {
      var searchbook = []
      if (val) {
        console.log(this.bookStoreSelect)
        for (var i = 0; i < this.bookStoreSelect.length; i++) {
          if (this.bookStoreSelect[i].name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            searchbook.push(Object.assign({}, this.bookStoreSelect[i]))
          }
        }
        this.bookNum = searchbook.length
        this.bookStoreRender = searchbook.slice(0, 9)
      } else {
        this.bookStoreRender = this.bookStoreSelect.slice(0, 9)
      }
    },

    searchBtnHandler (val) {
      this.bookStoreSelect = []
      if (val !== 'all') {
        for (var i = 0; i < this.bookStore.length; i++) {
          if (this.bookStore[i].key.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            this.bookStoreSelect.push(Object.assign({}, this.bookStore[i]))
          }
        }
        this.bookNum = this.bookStoreSelect.length
        this.bookStoreRender = this.bookStoreSelect.slice(0, 9)
      } else {
        this.initPage()
      }
    }
  }
}
</script>

<style scoped>
.search {
  width: 900px;
  display: flex;
  margin: 20px auto;
}
.search-button-wrapper {
  width: 70%;
  line-height: 40px;
}

.search-button-wrapper .label {
  font-size: 12px;
  font-family: '黑体';
  font-weight: bold;
}
.search-input-wrapper {
  width: 30%;
}
.book-content-wrapper {
  display: flex;
  width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #82384e;
}

.main-book-lists {
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  padding-bottom: 40px;
  position: relative;
}

.main-book-lists li {
  list-style: none;
  width: 200px;
  box-sizing: border-box;
  height: 275px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  background-color: #fafafa;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.1);
}

.main-book-lists li:hover {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
}
.main-book-lists li img {
  margin: auto;
}

.book-name-wrapper {
  font-size: 12px;
  margin-top: 10px;
  font-weight: 900;
  line-height: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-name-wrapper .book-name {
  width: 100px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.book-load {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 10px;
  transition: all 1s;
}

.book-load:hover {
  width: 32px;
  height: 32px;
  box-shadow: 0 2px 2px 0 #cccccc;
}
.book-page {
  position: absolute;
  bottom: 10px;
  margin: auto;
}

.book-content-right {
  width: 200px;
}

.book-content-right .right-1 {
  width: 100%;
  height: 150px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
}
.book-content-right .right-1 span {
  text-indent: 2em;
  word-break: break-all;
  font-size: 14px;
}

.book-content-right .right-2 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 10px;
}

.book-content-right .right-3 {
  margin-top: 20px;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  box-sizing: border-box;
  text-indent: 1em;
  background-color: #ffffff;
  border-radius: 10px;
}

.book-content-right .right-2 .thank {
  margin: 5px auto;
  text-align: center;
  font-size: 14px;
}
.el-button.is-circle {
  padding: 7px;
}

.isactived {
  background: #444444;
  border-color: #444444;
}

.el-button {
  font-family: 'yaya';
  font-weight: bold;
}
</style>

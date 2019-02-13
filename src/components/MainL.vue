<template>
<div>
  <div class="search">
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="inputbook"></el-input>
  </div>
  <ul class="main-book-lists">
    <li v-for="(book, item) in bookStoreAll" :key="item">
      <div>
        <img :src="'static/bookimg/' + book.img" width="150" height="189">
      </div>
      <div class="book-name-wrapper">
        <span class="book-name" :title="book.name">{{book.name}}</span>
        <img class="book-load" @click.stop="returnLoadUrl(book.url)" src="static/download.svg">
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
</div>
</template>

<script>
import bookStore from '../bookStore'
export default {
  name: 'main-l',
  mounted () {
    this.initPage()
  },
  data () {
    return {
      bookStore,
      bookStoreAll: [],
      inputbook: '',
      bookNum: 0
    }
  },
  computed: {
    totalPageNum () {
      return this.bookStoreAll.length / 2
    }
  },
  watch: {
    inputbook (val) {
      if (val) {
        var bookStoreN = []
        for (var i = 0; i < this.bookStore.length; i++) {
          if (bookStore[i].name.toLowerCase().indexOf(val.toLowerCase()) !== -1) {
            bookStoreN.push(Object.assign({}, this.bookStore[i]))
          }
        }
        this.bookNum = bookStoreN.length
        this.bookStoreAll = bookStoreN
      } else {
        this.initPage()
      }
    }
  },
  methods: {
    returnLoadUrl (url) {
      window.open(url)
    },
    currentChangeHandler (pageNum) {
      this.bookStoreAll = this.bookStore.slice((pageNum - 1) * 9, pageNum * 9)
    },
    initPage () {
      this.bookNum = this.bookStore.length
      this.bookStoreAll = this.bookStore.slice(0, 9)
    }
  }
}
</script>

<style scoped>
.search {
  width: 400px;
  margin: 20px auto;
}
.main-book-lists {
  width: 800px;
  background-color: #f2f2f2;
  margin: 20px auto;
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
  height: 265px;
  margin: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
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
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
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
</style>

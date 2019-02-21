<template>
  <div class="all-wrapper">
    <div class="banner">
      利用<a href="http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_bayesian_average.html" target="__blank">"贝叶斯平均法"</a>,
    数据来源<a href="https://book.douban.com/" target="__blank">"豆瓣读书"</a>.选取评分为8.1+和评论人数为200+的100条数据.
    再利用贝叶斯平均算法计算得到散点图,其中圆的大小表示为最终的得分占比.即圆的面积越大,其价值越高.<br />
    <b>*由于豆瓣数据的格式部分出现混乱情况,所以可能部分的数据名称显示不全</b>.
    </div>
    <ul class="choice-lang-wrapper">
      <li
        v-for="(lang, index) in langArr"
        :class="{'lang-active': selectValue === lang.name}"
        @click="initData(lang.name)"
        :key="lang.name">
          <span>{{lang.label}}</span>
          <span class="close" v-if="index > 3" @click.stop="closeLang(index)"></span>
        <li @click="openMessage">
          <el-button type="text">+</el-button>
        </li>
    </ul>
    <div class="chart" ref="myEchart"></div>
    <div class="clear"></div>
  </div>
</template>

<script>
import jsonp from 'jsonp'
import echarts from 'echarts'
export default {
  name: 'recommend',
  data () {
    return {
      selectValue: '',
      timeout: true,
      langArr: [{
        name: 'java',
        label: 'java'
      }, {
        name: 'c语言',
        label: 'c/c++'
      }, {
        name: 'javascript',
        label: 'js'
      }, {
        name: 'python',
        label: 'python'
      }]
    }
  },
  mounted () {
    this.initData('java')
  },
  methods: {
    closeLang (index) {
      this.langArr.splice(index, 1)
      this.initData(this.langArr[this.langArr.length - 1].name)
    },
    openMessage () {
      this.$prompt('请输入查询书籍类别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.langArr.push({
          name: value,
          label: value
        })
        this.initData(value)
        this.$message({
          type: 'success',
          message: value + '添加成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    initData (item) {
      this.selectValue = item
      jsonp('https://api.douban.com/v2/book/search?q=' + item + '&count=100', null, (err, data) => {
        if (err) {
          console.error(err.message)
        } else {
          const books = data.books
          const bookPre = []
          const bookCharts = []
          let lowest = 0
          let totalAverage = 0
          for (let i = 0; i < books.length; i++) {
            if (books[i].rating &&
                parseFloat(books[i].rating.average) > 8.1 &&
                books[i].rating.numRaters > 200) {
              const numRaters = books[i].rating.numRaters
              lowest = (lowest !== 0 && lowest < numRaters) ? lowest : numRaters
              totalAverage += parseFloat(books[i].rating.average)
              bookPre.push(books[i])
            }
          }
          for (let j = 0; j < bookPre.length; j++) {
            const average = bookPre[j].rating.average
            const numRaters = bookPre[j].rating.numRaters
            const title = bookPre[j].title
            const Denominator = numRaters + lowest // v + m
            const size = ((average * numRaters + lowest * totalAverage / bookPre.length) / Denominator).toFixed(3)
            bookCharts.push([average, numRaters, parseFloat(size), title])
          }
          const options = {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            title: {
              text: this.selectValue + '书籍参与数和评分',
              textStyle: {
                fontSize: 12,
                fontFamily: 'yaya'
              },
              padding: [20, 100]

            },
            xAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              scale: true
            },
            yAxis: {
              splitLine: {
                lineStyle: {
                  type: 'dashed'
                }
              },
              scale: true
            },
            series: [{
              data: bookCharts,
              type: 'scatter',
              symbolSize: function (dat) {
                return Math.pow(dat[2] * 10 - 80, 2) / 3
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3]
                  },
                  position: 'top'
                },
                fontFamily: 'yaya',
                color: '#111111',
                fontSize: 14
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                  }, {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                  }])
                }
              }
            }]
          }
          this.chart = echarts.init(this.$refs.myEchart)
          this.chart.setOption(options)
        }
      })
    }
  }
}
</script>
<style>
  .choice-lang-wrapper {
    width: 50px;
    float: left;

  }
  .banner {
    width: 100%;
    text-indent: 2em;
    padding: 40px;
    background: #eeeeee;
    box-shadow: 0 4px 4px 0 #cccccc;
    margin-bottom: 20px;
    box-sizing: border-box;
    font-size: 16px;
    border-radius: 20px;
  }
  .banner b {
    font-size: 12px;
  }
  .choice-lang-wrapper li {
    list-style: none;
    width: 65px;
    box-sizing: border-box;
    height: 65px;
    margin: 10px 0;
    font-size: 12px;
    line-height: 65px;
    text-align: center;
    background: #eeeeee;
    border-radius: 15px;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
    position: relative;
  }

  .choice-lang-wrapper li .close {
    position: absolute;
    top: -10px;
    right: -10px;
    display: block;
    box-sizing: border-box;
    border-radius: 10px;
    width: 20px;
    height: 20px;
    background: url('../../static/close1.png') center center no-repeat;
  }

  .choice-lang-wrapper li .close:hover {
    border: 1px solid #444444;
  }

  .lang-active {
    border: 2px solid #e56f79 !important;
  }

  .all-wrapper {
    width: 800px;
    margin: auto;
  }

  .chart {
    float: right;
    width: 650px;
    height: 500px;
    border-radius: 20px;
    margin: auto;
    overflow: hidden;
  }

  .clear {
    clear: both;
  }
</style>

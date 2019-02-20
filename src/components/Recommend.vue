<template>
  <div class="all-wrapper">
    <ul class="choice-lang-wrapper">
      <li
        v-for="lang in langArr"
        :class="{'lang-active': selectValue === lang.name}"
        @click="initData(lang.name)"
        :key="lang.name">{{lang.label}}</li>
    </ul>
    <div class="chart" ref="myEchart"></div>
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
        name: 'c++',
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
                books[i].rating.numRaters > 500 &&
                books[i].rating.numRaters > 300) {
              const numRaters = books[i].rating.numRaters
              lowest = (lowest !== 0 && lowest < numRaters) ? lowest : numRaters
              totalAverage += parseFloat(books[i].rating.average)
              bookPre.push(books[i])
            }
          }
          for (let j = 0; j < bookPre.length; j++) {
            const average = bookPre[j].rating.average
            const numRaters = bookPre[j].rating.numRaters
            const title = bookPre[j].title + ' ' + bookPre[j].subtitle
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
  .choice-lang-wrapper li {
    list-style: none;
    width: 50px;
    box-sizing: border-box;
    height: 50px;
    margin: 10px 0;
    font-size: 12px;
    line-height: 50px;
    text-align: center;
    background: #eeeeee;
    border-radius: 15px;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
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
</style>

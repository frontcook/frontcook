<template>
  <div>
    <ul>
      <li></li>
    </ul>
    <div style="width: 600px;height: 500px;" ref="myEchart"></div>
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
        name: ''
      }]
    }
  },
  watch: {
    selectValue (val) {
      if (this.timeout) {
        this.timeout = false
        this.initData(val)
        setTimeout(() => {
          this.timeout = true
        }, 400)
      }
    }
  },
  methods: {
    initData (item) {
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
              text: this.selectValue + '书籍参与数和评分'
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

<template>
  <div ref="d3_demo"></div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'home',
  mounted () {
    var width = 300
    var height = 300

    var svg = d3.select(this.$refs.d3_demo)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
    var dataset = [ 250, 210, 170, 130, 90 ]
    var rectHeight = 25
    svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', 20)
      .attr('y', function (d, i) {
        return i * rectHeight
      })
      .attr('width', function (d) {
        return d
      })
      .attr('height', rectHeight - 2)
      .attr('fill', 'steelblue')
  }
}
</script>

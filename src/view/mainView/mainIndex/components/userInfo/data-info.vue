<template>
  <div class="data-info">
    <div class="charts">
      <div id="myChart" :style="{width: '200px', height: '200px'}"></div>
    </div>
    <div class="charts_data">
      <ul>
        <li>
          <span class="left">{{Insurance1}}</span>
          <span class="right">{{data1}} 份</span>
        </li>
        <li>
          <span class="left">{{Insurance2}}</span>
          <span class="right">{{data2}} 份</span>
        </li>
        <li>
          <span class="left">{{Insurance3}}</span>
          <span class="right">{{data3}} 份</span>
        </li>
        <li>
          <span class="left">{{Insurance4}}</span>
          <span class="right">{{data4}} 份</span>
        </li>
        <li>
          <span class="left">{{Insurance5}}</span>
          <span class="right">{{data5}} 份</span>
        </li>
        <li>
          <span class="left">{{Insurance6}}</span>
          <span class="right">{{data6}} 份</span>
        </li>
        <li style="margin-top:16px;">
          <span class="left">建议推荐：意外险</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'data-info',
  data () {
    return {
      Insurance1: '重疾保险',
      Insurance2: '医疗保险',
      Insurance3: '意外保险',
      Insurance4: '大病保险',
      Insurance5: '其他保险',
      Insurance6: '轻症保险',
      data1: '2',
      data2: '1',
      data3: '5',
      data4: '3',
      data5: '2',
      data6: '4'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          triggen: 'axis'
        },
        radar: [{
          indicator: [
            // max 指示器的最大值
            {text: this.Insurance1, max: 5},
            {text: this.Insurance2, max: 5},
            {text: this.Insurance3, max: 5},
            {text: this.Insurance4, max: 5},
            {text: this.Insurance5, max: 5},
            {text: this.Insurance6, max: 5}
          ],
          radius: 40 // 圆的半径
        }],
        series: [{
          tooltip: {
            triggen: 'item'
          },
          itemStyle: {normal: {areaStyle: {type: 'default'}}},
          type: 'radar',
          data: [
            {
              value: [this.data1, this.data2, this.data3, this.data4, this.data5, this.data6]
            }
          ]
        }]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/css/allcolor.scss';

#myChart{
  position: relative;
  top: 0px;
  left: 0px;
  margin: 0;
}
.data-info{
  width: 100%;
  height: 26vh;
  clear: both;
  .charts{
    width: 50%;
    height: 100%;
    float: left;
    clear: both;
    overflow: hidden;
  }
  .charts_data{
    width: 50%;
    height: 100%;
    float: right;
    ul{
      padding: 0;
      margin: 5px;
      margin-top: 23px;
      margin-right: 40px;
      list-style-type: none;
      li{
        clear: both;
        display: block;
        height: 12px;
        margin-bottom: 10px;
        color: $fontcolor;
        span{
          display: inline-block;
          font-size:11px;
          font-family:'MicrosoftYaHei';
        }
        .left{
          float: left;
          text-align: start;
        }
        .right{
          float: right;
          text-align: end;
        }
      }
    }
  }
}
</style>

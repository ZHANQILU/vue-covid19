/*
 * 开发vue插件使用echarts
 * Object.defineProperties(obj, props)
 * 方法直接在一个对象上定义新的属性或修改现有属性，并返回该对象
 * obj 在其上定义或修改属性的对象
 * props 要定义其可枚举属性或修改的属性描述符的对象
 */

// 导入echarts
import echarts from 'echarts'
// 导入地图的js文件
import 'echarts/map/js/china'

const install = function (Vue, options) {
  // 添加实例方法
  Object.defineProperties(Vue.prototype, {
    $myChart: {
      get() {
        return {
          // 1. 绘制中国地图
          chinaMap(id, data, tip) {
            var myChart = echarts.init(document.getElementById(id))
            var option = {
              tooltip: {
                // 悬浮弹框
                triggerOn: 'click', // 提示框触发的条件
                enterable: true, // 鼠标是否可进入提示框浮层中，默认为false
                // {b}数据名 {c}数据值
                formatter: `{b}<br/>${tip} {c} 例`
              },
              visualMap: [
                {
                  // 映射-颜色值
                  orient: 'vertical', // 垂直分段:horizontal水平
                  type: 'piecewise',
                  pieces: [
                    // 配置颜色区间
                    { min: 0, max: 0, color: '#FFFFFF' },
                    { min: 1, max: 100, color: '#FDFDCF' },
                    { min: 100, max: 500, color: '#FE9E83' },
                    { min: 500, max: 1000, color: '#E55A4E' },
                    { min: 1000, max: 100000, color: '#4F070D' },
                    { min: 100000, max: +Infinity, color: '#000' }
                  ]
                }
              ],
              series: [
                {
                  name: '省',
                  type: 'map', // 配置图表类型
                  map: 'china', // 中国地图
                  roam: false, // 是否允许自动缩放
                  zoom: 1.2, // 地图缩放的标准比例
                  label: {
                    normal: {
                      show: true, // 控制地图显示名字
                      textStyle: {
                        fontSize: 12
                      }
                    }
                  },
                  // 配置图表样式
                  itemStyle: {
                    // 一般样式
                    normal: {
                      areaColor: 'rgba(0,255,236,0)',
                      borderColor: 'rgba(0,0,0,0.2)'
                    },
                    // 选中区域样式
                    emphasis: {
                      areaColor: 'rgb(211, 253, 253)',
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 0,
                      borderWidth: 0,
                      borderColor: 'rgb(51,51,51)'
                    }
                  },
                  data
                  // data字段示例：
                  // data:[
                  //     {name:"内蒙古",value:10}
                  // ]
                }
              ]
            }
            myChart.setOption(option)
          }
        }
      }
    }
  })
}

export default install

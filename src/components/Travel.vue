<template>
  <div>
    <div class="header">
      <van-divider content-position="left">
        <p class="title">出行防疫政策查询</p>
      </van-divider>
    </div>
    <Cascader
      :options="options"
      label="出发地区"
      placeholder="请选择出发地区"
      @onValue="getFromCity"
    ></Cascader>
    <Cascader
      :options="options"
      label="到达地区"
      placeholder="请选择到达地区"
      @onValue="getToCity"
    ></Cascader>
    <van-button type="info" block @click="toTravelView">查看政策</van-button>
  </div>
</template>

<script>
import api from '@/api'
import Cascader from '@/components/Cascader.vue'
export default {
  name: 'Travel',
  data() {
    return {
      citys: {
        from: {},
        to: {}
      },
      options: []
    }
  },
  components: {
    Cascader
  },
  methods: {
    // 查询出行防疫政策
    getFromCity(data) {
      this.citys.from = data
    },
    getToCity(data) {
      this.citys.to = data
    },
    // 前往出行防疫政策页面
    toTravelView() {
      if (this.citys.to && this.citys.from) {
        // 路由跳转并携带参数 注意这里是对象写法必须使用name不能用path
        this.$router.push({
          name: 'policy',
          params: { citys: this.citys }
        })
      } else {
        alert('请选择地区')
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('options')) {
      api
        .getCityName({
          key: 'e9b4d95bcb942e342a309093c53c9943'
        })
        .then((response) => {
          if (response.status == 200) {
            // 拼接options选项列表
            const options = []
            for (const province of response.data.result) {
              const children = []
              for (const city of province.citys) {
                const cityData = {
                  text: city.city,
                  value: city.city_id
                }
                children.push(cityData)
              }
              const provinceData = {
                text: province.province,
                value: province.province_id,
                children
              }
              options.push(provinceData)
            }
            this.options = options
            // 存在localStorage中 防止发生多次请求(这个接口每天只允许请求50次)
            localStorage.setItem('options', JSON.stringify(options))
          }
        })
    } else {
      this.options = JSON.parse(localStorage.getItem('options'))
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 10px;
  background: #fff;
  .title {
    font-size: 18px;
    font-weight: 900;
    color: black;
  }
}
</style>

<template>
  <div>
    <div class="header">
      <van-divider content-position="left">
        <p class="title">核酸检测机构查询</p>
      </van-divider>
    </div>
    <Cascader
      :options="options"
      label="查询地区"
      placeholder="请选择查询地区"
      @onValue="getPcrCity"
    ></Cascader>
    <van-button type="info" block @click="toPcrView"
      >查看核酸检测机构</van-button
    >
  </div>
</template>

<script>
import api from '@/api'
import Cascader from '@/components/Cascader.vue'
export default {
  data() {
    return {
      city: {},
      options: []
    }
  },
  components: {
    Cascader
  },
  methods: {
    // 查询核酸检测机构
    getPcrCity(data) {
      this.city = data
    },
    // 前往核酸检测机构页面
    toPcrView() {
      if (this.city) {
        // 路由跳转并携带参数 注意这里是对象写法必须使用name不能用path
        this.$router.push({
          name: 'pcr',
          params: { city: this.city }
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

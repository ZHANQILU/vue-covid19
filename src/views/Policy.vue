<template>
  <div class="container">
    <van-tabs v-model="active" color="#2780f1">
      <van-tab :title="fromInfo.city_name" class="container">
        <van-divider>
          <p class="title">返乡政策</p>
        </van-divider>
        <p>{{ fromInfo.high_in_desc }}</p>
        <p>{{ fromInfo.low_in_desc }}</p>
        <van-divider>
          <p class="title">出行建议</p>
        </van-divider>
        <p>{{ fromInfo.out_desc }}</p>
      </van-tab>
      <van-tab :title="toInfo.city_name">
        <van-divider>
          <p class="title">返乡政策</p>
        </van-divider>
        <p>{{ toInfo.high_in_desc }}</p>
        <p>{{ toInfo.low_in_desc }}</p>
        <van-divider>
          <p class="title">出行建议</p>
        </van-divider>
        <p>{{ toInfo.out_desc }}</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'Policy',
  props: ['citys'],
  data() {
    return {
      fromInfo: {},
      toInfo: {},
      active: 2
    }
  },
  methods: {
    look() {
      api
        .getPolicy({
          from: this.citys.from.value,
          to: this.citys.to.value,
          key: 'e9b4d95bcb942e342a309093c53c9943'
        })
        .then((response) => {
          if (response.status == 200) {
            this.fromInfo = response.data.result.from_info
            this.toInfo = response.data.result.to_info
          }
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  },
  mounted: function () {
    // 访问页面时自动触发函数
    this.look()
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 768px;
  // height: 1200px;
  margin: 0 auto;
  padding: 0 10px;
  background-color: #fff;
  .title {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  p {
    // 只有遇到换行符才会换行
    white-space: pre-line;
    font-size: 14px;
  }
}
</style>

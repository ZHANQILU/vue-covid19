<template>
  <div>
    <div class="header">
      <van-divider content-position="left">
        <p class="title">疫情实时播报</p>
      </van-divider>
    </div>
    <div class="steps">
      <van-steps
        direction="vertical"
        active-icon="info"
        inactive-icon="info"
        active-color="#555555"
        inactive-color="#555555"
      >
        <van-step v-for="item in covidInfo" :key="item.id">
          <van-tag type="primary" size="medium">{{ item.pubDateStr }}</van-tag>
          <a :href="item.sourceUrl" class="info">{{ item.title }}</a>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Covid19Info',
  computed: {
    ...mapState('tianXing', ['covidInfo'])
  }
  // watch: {
  //   covidInfo: {
  //     handler(newValue) {
  //       this.covidInfo = newValue
  //     },
  //     deep: true
  //   }
  // }
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

.info {
  display: block;
  margin-top: 5px;
  color: black;
}
</style>

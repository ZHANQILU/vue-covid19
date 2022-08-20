<template>
  <div>
    <div class="header">
      <van-divider content-position="left">
        <p class="title">确诊病例分布图</p>
      </van-divider>
    </div>
    <!-- 地图容器 -->
    <div id="main" style="width: 768px; height: 562px"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ChinaMap',
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapState('xinLang', ['mapChinaNow'])
  },
  watch: {
    mapChinaNow: {
      handler(newValue) {
        this.$myChart.chinaMap('main', newValue, '现存确诊')
      }
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
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>

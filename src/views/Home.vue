<template>
  <div class="home">
    <van-tabs v-model="active" scrollspy sticky color="#1989fa">
      <!-- 头部海报 -->
      <Header></Header>
      <van-tab title="国内疫情">
        <!-- 疫情实时信息 -->
        <Covid19Info :covidInfo="covidInfo"></Covid19Info>
        <!-- 病例数量 -->
        <CaseNumber></CaseNumber>
        <!-- 国内疫情地图 -->
        <ChinaMap></ChinaMap>
      </van-tab>
      <!-- 各省市现存确诊数据 -->
      <EveryWhere></EveryWhere>
      <van-tab title="出行防疫">
        <!-- 出行防疫政策查询 -->
        <Travel></Travel>
        <!-- 核酸检测机构查询 -->
        <SearchPcr></SearchPcr>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Covid19Info from '@/components/Covid19Info.vue'
import CaseNumber from '@/components/CaseNumber.vue'
import ChinaMap from '@/components/ChinaMap.vue'
import EveryWhere from '@/components/EveryWhere.vue'
import Travel from '@/components/Travel.vue'
import SearchPcr from '@/components/SearchPcr.vue'
export default {
  name: 'Home',
  data() {
    return {
      active: 0
    }
  },
  components: {
    Header,
    Covid19Info,
    CaseNumber,
    ChinaMap,
    EveryWhere,
    Travel,
    SearchPcr
  },
  // 发送网络请求
  created() {
    this.$store.dispatch('tianXing/getNcov')
    this.$store.dispatch('xinLang/getNcovCities')
  }
}
</script>

<style lang="less">
.home {
  width: 768px;
  margin: 0 auto;
  padding: 0 10px;
  background-color: #fff;
}
</style>

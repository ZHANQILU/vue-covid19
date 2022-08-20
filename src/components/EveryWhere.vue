<template>
  <div class="every">
    <div class="header">
      <van-divider content-position="left">
        <p class="title">各省市疫情数据</p>
      </van-divider>
      <span>该数据为31省（自治区、直辖市）及港澳台本土确诊数据</span>
    </div>
    <div class="main" ref="container">
      <van-sticky :container="container" :offset-top="44">
        <van-cell title="地区" value="现有确诊" class="only" />
      </van-sticky>
      <!-- 展示前十条数据 -->
      <van-cell-group v-for="item in everyPlacePart1" :key="item.id">
        <van-cell :value="separator(item.nowConfirm)">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <van-tag plain round type="primary">{{ item.prov }}</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 展示后面剩余的数据 -->
      <van-row v-show="!isShow" @click="isShow = !isShow">
        展开全部<van-icon name="arrow-down" class="table"></van-icon>
      </van-row>
      <van-cell-group
        v-show="isShow"
        v-for="item in everyPlacePart2"
        :key="item.id"
      >
        <van-cell :value="separator(item.nowConfirm)">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <van-tag plain round type="primary">{{ item.prov }}</van-tag>
          </template>
        </van-cell>
      </van-cell-group>
      <van-row v-show="isShow" @click="isShow = !isShow" class="table">
        收起<van-icon name="arrow-up"></van-icon>
      </van-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import formatter from '@/utils/formatter'
export default {
  name: 'EveryWhere',
  data() {
    return {
      isShow: false,
      container: null
    }
  },
  computed: {
    ...mapState('xinLang', ['everyPlace']),
    everyPlacePart1() {
      return this.everyPlace.slice(0, 10)
    },
    everyPlacePart2() {
      return this.everyPlace.slice(10)
    }
  },
  methods: {
    separator(num) {
      return formatter.separator(num)
    }
  },
  mounted() {
    this.container = this.$refs.container
  }
}
</script>

<style scoped lang="less">
.every {
  .header {
    padding: 10px;
    background: #fff;
    .title {
      font-size: 18px;
      font-weight: 900;
      color: black;
    }
  }
  .custom-title {
    margin-right: 5px;
    vertical-align: middle;
  }
  .van-cell {
    width: 746px;
    height: 40px;
    margin: auto;
  }
  .only {
    background-color: #eee;
  }
  .van-cell__title,
  .van-cell__value {
    text-align: center;
  }
  .only .van-cell__value {
    border-left: 3px solid #1998fb;
  }

  .main {
    padding: 0 10px;
    text-align: center;
    background-color: #fff;
    .table {
      height: 40px;
      line-height: 40px;
      border-bottom: 0.1px solid #ebedf0;
    }
  }
}
</style>

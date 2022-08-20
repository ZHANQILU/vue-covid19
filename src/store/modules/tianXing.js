// 引入 api
import api from '@/api'
//引入 nanoid
import { nanoid } from 'nanoid'

// 这个文件处理来自天行API的数据
// 全国疫情数据 <http://api.tianapi.com/ncov/index?key=1418c5d0819239adbb4f75c949f15f08>

// 创建vuex实例
const tianXing = {
  namespaced: true, // 开启命名空间，防止变量冲突
  state: {
    // 国内疫情
    caseNumChina: {},
    // 最新消息
    covidInfo: [],
    // 高风险地区
    highRisk: [],
    // 中风险地区
    midRisk: []
  },
  actions: {
    async getNcov({ commit }) {
      try {
        const res = await api.getNcov({
          key: '1418c5d0819239adbb4f75c949f15f08'
        })
        if (res.status === 200) {
          commit('handleNcov', res.data.newslist[0])
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    handleNcov(state, data) {
      // 国内疫情
      state.caseNumChina = data.desc
      // state.highRisk = data.riskarea.high
      // state.midRisk = data.riskarea.mid
      // 新闻速报
      let temp = {}
      for (const news of data.news) {
        temp = news
        temp.id = nanoid()
        state.covidInfo.push(temp)
      }
    }
  }
}

//导出store对象
export default tianXing

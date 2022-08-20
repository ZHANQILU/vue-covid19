// 引入API
import api from '@/api'

// 在这里处理来自网易API的数据
// 各个省市疫情数据：<https://c.m.163.com/ug/api/wuhan/app/data/list-total>

const wy163 = {
  namespaced: true, // 开启命名空间
  state: {
    everyWhere: [], // 国内各地区当下疫情汇总
    mapChinaNow: []
  },
  actions: {
    async getNcovCity({ commit }) {
      try {
        const res = await api.getNcovCity({})
        if (res.status === 200) {
          commit('handleNcovCity', res.data.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    handleNcovCity(state, data) {
      const provinces = data.areaTree[2].children
      for (const province of provinces) {
        // 拼接成echarts需要的格式 { name: '北京', value: '100'}
        const temp = {
          // 省市名
          name: province.name,
          // 现存确诊病例数
          // value: province.today.storeConfirm
        }
        state.mapChinaNow.push(temp)
        const cities = province.children
        for (const city of cities) {
          const tmp = {
            id: city.id,
            // 市区名
            name: city.name,
            // 现存确诊数量
            // nowConfirm: city.today.storeConfirm,
            // 新增确诊
            // newConfirm: city.tody.confirm,
            // 所属省(直辖市)名称
            prov: province.name
          }
          state.everyWhere.push(tmp)
        }
      }
    }
  }
}

export default wy163

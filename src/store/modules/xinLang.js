// 引入API
import api from '@/api'

// 在这里处理来自新浪API的数据
// 各个省市疫情数据：<https://interface.sina.cn/news/wap/fymap2020_data.d.json>

const xinLang = {
  namespaced: true, // 开启命名空间
  state: {
    everyPlace: [], // 国内各地区当下疫情汇总
    mapChinaNow: []
  },
  actions: {
    async getNcovCities({ commit }) {
      try {
        const res = await api.getNcovCities()
        if (res.status == 200) {
          commit('handleNcovCities', res.data.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
  },
  mutations: {
    handleNcovCities(state, data) {
      const provinces = data.list
      for (const province of provinces) {
        // 拼接成echarts需要的格式 { name: '北京', value: '100'}
        const temp = {
          // 省市名
          name: province.name,
          // 现存确诊病例数
          value: province.econNum
        }
        state.mapChinaNow.push(temp)
        const cities = province.city
        for (const city of cities) {
          // 排除境外输入和现存确诊病例为0的地区
          if (city.econNum !== '0' && city.mapName !== '') {
            const tmp = {
              id: city.citycode,
              // 市区名
              name: city.mapName,
              // 现存确诊数量
              nowConfirm: city.econNum,
              // 所属省(直辖市)名称
              prov: province.name
            }
            state.everyPlace.push(tmp)
          }
        }
      }
    }
  }
}

export default xinLang

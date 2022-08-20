import axios from '@/utils/request'

const base = {
  baseUrl: 'http://api.tianapi.com',
  ncov: '/txapi/ncov/index',
  jhBaseUrl: '/api1',
  sinaBaseUrl: '/api2',
  cityName: '/springTravel/citys',
  travel: '/springTravel/query',
  pcr: '/springTravel/hsjg'
}

const api = {
  /* 疫情数据 */
  getNcov(params) {
    return axios.get(base.baseUrl + base.ncov, {
      params
    })
  },
  // 省市名称及现存确诊人数，新浪的接口
  getNcovCities() {
    return axios.get(base.sinaBaseUrl)
  },
  // 省市清单 聚合的接口 需要配置代理服务器
  getCityName(params) {
    return axios.get(base.jhBaseUrl + base.cityName, {
      params
    })
  },
  // 出行防疫政策 聚合的接口 需要配置代理服务器
  getPolicy(params) {
    return axios.get(base.jhBaseUrl + base.travel, {
      params
    })
  },
  // 核酸检测机构 聚合的接口 需要配置代理服务器
  getPCR(params) {
    return axios.get(base.jhBaseUrl + base.pcr, {
      params
    })
  }
}

export default api

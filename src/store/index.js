import Vue from 'vue'
import Vuex from 'vuex'
import tianXing from '@/store/modules/tianXing.js'
import wy163 from '@/store/modules/wy163.js'
import xinLang from '@/store/modules/xinLang.js'

// 应用Vuex插件
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tianXing,
    wy163,
    xinLang
  }
})

export default store

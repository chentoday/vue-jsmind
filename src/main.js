import Vue from 'vue'
import App from './App.vue'

import JsMind from '../dist/build'
// import JsMind from './components/JsMind/index'
Vue.use(JsMind)

new Vue({
  el: '#app',
  render: h => h(App)
})

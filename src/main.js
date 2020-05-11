import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.prototype.axios=axios
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

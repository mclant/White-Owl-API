import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import Vuetify from 'vuetify'

Vue.use(Vuetify)

Vue.config.productionTip = false
/*
const vuerouter = new Router ({
  router
});
*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')

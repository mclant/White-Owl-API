import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router';
import Vuetify from 'vuetify'
import Axios from 'axios'
import VueResource from 'vue-resource'
import cors from 'cors'

Vue.use(Vuetify);
Vue.use(Axios);
Vue.use(VueResource);
Vue.use(cors);

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


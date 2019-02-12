import Vue from 'vue'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import runScan from '@/components/run_scan'
import Router from 'vue-router'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/runscan',
      name: 'runScan',
      component: runScan
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

export default router
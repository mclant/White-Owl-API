<template>
  <v-app
    id="inspire"
    dark>
    <v-toolbar 
      dark
      height="75px"
      >
        <v-img
          :src="require('./assets/whiteowl.png')"
          class="my-3"
          contain
          height="45"
          alt=""
        ></v-img>
      <v-toolbar-title>
        <span>WHITE<b>OWL</b> | </span>
        <span class="font-weight-light">ISaaS</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn
        id="qsLoginBtn"
        v-if="!authenticated"
        @click="login"
        color="error"
        >
        Log In
      </v-btn>
      <v-btn
        id="qsLogoutBtn"
        v-if="authenticated"
        @click="logout"
        color="error"
        >
        Log Out
      </v-btn>
    </v-toolbar>

    <div>
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>

    <v-content
      v-if="authenticated">
      <HelloWorld/>
    </v-content>

    <v-container
      v-if="!authenticated">
      <v-layout>
        <v-flex
          xs12
        >
          <runScan/>
        </v-flex>
      </v-layout>
    </v-container>

  </v-app>
</template>


<script>
import AuthService from './auth/AuthService.js';

const auth = new AuthService();

import HelloWorld from './components/HelloWorld'
import runScan from './components/run_scan'

export default {
  name: 'app',
  components: {
    HelloWorld,
    runScan,
  },
  data () {
    return {
      auth,
      authenticated: auth.authenticated,
      currentUser: '',
    }
  },
  created () {
    auth.authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })

    if (auth.getAuthenticatedFlag() === 'true') {
      auth.renewSession()
    }
  },
  methods: {
    login () {
      auth.login()
    },
    logout () {
      auth.logout()
    },
  }
}
</script>

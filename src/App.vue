<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <p v-if="!authenticated">Please log in</p>
      <p v-if="authenticated">You are logged in</p>

      <v-btn
        id="qsLoginBtn"
        v-if="!authenticated"
        @click="login"
        >
        Log In
      </v-btn>

      <v-btn
        id="qsLogoutBtn"
        v-if="authenticated"
        @click="logout"
        >
        Log Out
      </v-btn>
    </v-toolbar>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>

    <v-content>
      <HelloWorld/>
    </v-content>

  </v-app>
</template>


<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()

import HelloWorld from './components/HelloWorld'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      auth,
      authenticated: auth.authenticated
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
    }
  }
}
</script>

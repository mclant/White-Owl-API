<script src="https://cdn.jsdelivr.net/npm/vue@2.5.22/dist/vue.js"></script>

<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/whiteowl.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to White Owl Security
        </h1>
        <div id="my_app">
          <p v-if="!authenticated"
            class="subheading font-weight-regular">
            Log In to re-run your security scan
          </p>
          <p v-if="authenticated">
            You have logged in! yay!
          </p>
        </div>
      </v-flex>
      

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-layout>
      </v-flex>

      <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>

    </v-layout>
  </v-container>
</template>

<script>

import AuthService from './../auth/AuthService'

const auth = new AuthService()

  export default {
    name: '#my_app',
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
    
  }
  
</script>

<style>

</style>

<template>
  <v-container>
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> to continue.
    </h4>
  <router-view></router-view>
  </v-container>
</template>

<script>

  export default {
    name: 'home',
    props: ['auth', 'authenticated'],
  }
</script>

<style>
  a {
    cursor: pointer;
  }
</style>
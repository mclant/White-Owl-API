import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'
import Auth0Lock from 'auth0-lock'

var lock = new Auth0Lock(
  'wIvsNVXWwRSkX001IewKhGpoKZPH1iaE',
  'whiteowl.auth0.com'
);



export default class AuthService {
  accessToken
  idToken
  expiresAt
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }

  getUser () {
    user = this.userProfile;
    return user;
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('home')
      } else if (err) {
        router.replace('home')
        console.log(err)
      }
    })
  }

  setSession (authResult) {
    this.accessToken = authResult.accessToken
    this.idToken = authResult.idToken
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    this.authNotifier.emit('authChange', { authenticated: true })

    localStorage.setItem('loggedIn', true)
  }

  
  renewSession () {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        this.logout()
        console.log(err)
      }
    })
  }

  

  logout () {
    // Clear access token and ID token from local storage
    this.accessToken = null
    this.idToken = null
    this.expiresAt = null

    this.userProfile = null
    this.authNotifier.emit('authChange', false)

    localStorage.removeItem('loggedIn')

    // navigate to the home route
    router.replace('home')
  }

  getAuthenticatedFlag () {
    return localStorage.getItem('loggedIn')
  }

  isAuthenticated () {
    return new Date().getTime() < this.expiresAt && this.getAuthenticatedFlag() === 'true'
  }
}
import { router } from '../index.js'

const API_URL = 'http://localhost:3000/api/v1.0/'
const LOGIN_URL = API_URL + 'login'
const SIGNUP_URL = API_URL + 'users/'

export default {

    user: {
        authenticated: false,
        id: 0,
        // username: localStorage.getItem('username'),
    },

    login(context, creds, redirect) {
        context.$http.post(LOGIN_URL, "username="+creds.username + "&password=" +creds.password, {
            headers: {
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                // 'Content-Type':'application/json'
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then( (response) => {
            console.log('logged ',response);
            this.user.authenticated = true

            localStorage.setItem('id_token', response.body.userId)
            // router.push('/dashboard')
                // if (redirect) {
                // router.go(redirect)
                // }
                
        }, (response) => {
            console.log('not logged ',response);
            context.error = "Brak takiego użytkownika";
            // if (this.error !== '') {
                context.$notify.error({
                  title: 'Error',
                  message: 'Brak takiego użytkownika'
                });
            // }
        })
    },

    signup(context, creds, redirect) {
        if (creds.userName === '' || creds.password === '') {
            context.error = 'Podaj nazwę użytkoniwa i haslo'
        } else {
            context.$http.post(SIGNUP_URL, creds).then((response) => {
                localStorage.setItem('id_token', response.id_token)

                // this.user.authenticated = true

                if (redirect) {
                    router.push(redirect)
                }

            }, (response) => {
                context.error = response
                console.log(response)
            })
        }
    },

    logout() {
        localStorage.removeItem('id_token')
        this.user.authenticated = false
        router.push('/login')
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
            this.user.id = jwt
        }
        else {
            this.user.authenticated = false
        }

    }
}
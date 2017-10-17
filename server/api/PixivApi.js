import request from 'request'
import _ from 'lodash'
import moment from 'moment'
import qs from 'qs'
import DataBase from './DataBase'

export default class PixivApi extends DataBase {
  constructor({
    username,
    password
  }) {
    super()

    this.name = 'pixiv'

    this.AUTH_URL = 'https://oauth.secure.pixiv.net/auth/token'
    this.API_URI = 'https://public-api.secure.pixiv.net/v1/'
    this.CLIENT_ID = 'bYGKuGVw91e0NMfPGp44euvGt59s'
    this.CLIENT_SECRET = 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK'

    this.access_token = ''

    this.username = username
    this.password = password
  }

  login(options) {
    if(!this.username || !this.password) { throw new Error('username and password is required') }

    const params = {
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      grant_type: 'password',
      username: this.username,
      password: this.password,
    }

    return new Promise((resolve, reject) => {
      request.post(this.AUTH_URL,
        {form: params},
        (err, res, body) => {
          if(err) { return reject(err) }
          if(res.statusCode !== 200) {
            return reject(new Error('not returned 200 response: ' + res.statusCode))
          }

          const token = JSON.parse(body)
          const { access_token , refresh_token } = token.response
          this.access_token = access_token

          resolve()
        }
      )
    })
  }

  fetchSearch(options) {
    const params = {
      uri: `${this.API_URI}search/works.json`,
      headers: {
        "Authorization": "Bearer " + this.access_token,
      }
    }

    console.log(params)
    return new Promise((resolve, reject) => {
      request.get(params,
        (err, res, body) => {
        console.log(body)
          if(err) {
            return reject(err)
          }
          if(res.statusCode !== 200) {
            return reject(new Error('not returned 200 response: ' + res.statusCode))
          }

          const data = JSON.parse(body)
          console.log(data)
          resolve(data)
        }
      )
    })
  }

  fetchApi() {

  }


  fetchWork(id, options) {
    const params = {
      uri: `${this.API_URI}works/${id}`,
      headers: {
        "Authorization": "Bearer " + this.access_token,
      },
      qs: options,
    }

    return new Promise((resolve, reject) => {
      request.get(params, (err, res, body) => {
        if(err) {
          return reject(err)
        }
        if(res.statusCode !== 200) {
          return reject(new Error('not returned 200 response: ' + res.statusCode))
        }

        const data = JSON.parse(body)
        resolve(data)
      })
    })
  }

  fetchUser(id, options) {
    const params = {
      uri: `${this.API_URI}users/${id}`,
      headers: {
        "Authorization": "Bearer " + this.access_token,
      },
      qs: options,
    }

    return new Promise((resolve, reject) => {
      request.get(params, (err, res, body) => {
        if(err) {
          return reject(err)
        }
        if(res.statusCode !== 200) {
          return reject(new Error('not returned 200 response: ' + res.statusCode))
        }

        const data = JSON.parse(body)
        resolve(data)
      })
    })
  }
}

const pixiv = new PixivApi({
  username: 'develo0',
  password: 'hdqqhi'
})

pixiv.login().then(() => {
  pixiv.fetchSearch({})
})

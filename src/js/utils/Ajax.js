import _ from 'lodash'
import axios from 'axios'
import {
  Qiita_API_URI,
  Qiita_API_KEY
} from '../constants/api'

const ajaxConf = {
  timeout: 1000 * 30,
  responseType: 'json'
}

export const ajax = axios.create(Object.assign({}, ajaxConf, {}))

export const qiitaAjax = axios.create(Object.assign({}, ajaxConf, {
  baseURL: Qiita_API_URI
}))

qiitaAjax.interceptors.response.use((res) => res.data, (err) => {
  console.error(err)
})

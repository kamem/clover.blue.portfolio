import request from 'request'
import _ from 'lodash'
import moment from 'moment'
import qs from 'qs'
import DataBase from './DataBase'

export default class QiitaApi extends DataBase {
  constructor() {
    super()

    this.name = 'qiita'

    this.API_URI = 'http://qiita.com/api/v2/'
    this.API_KEY = '20e2a912d33f6f9779faa71522d5baacef437a27'
    this.USER_NAME = 'kamem'
  }

  fetchItems() {
    const params = {
      url: `${this.API_URI}/users/${this.USER_NAME}/items?${qs.stringify({ per_page: 100 })}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.API_KEY}`
      }
    }

    return new Promise((resolve, reject) => {
      request(params,
        (err, response, body) => {
          if(!err && response.statusCode === 200) {
            resolve(JSON.parse(body))
          } else {
            console.log(err);
            reject(err)
          }
        }
      )
    })
  }

  saveEntries() {
    return new Promise((resolve, reject) => {
      this.fetchItems().then((responseBody) => {
        // QiitaのApiを取得してから、bodyの中身をDBに保存するフォーマットに変換してる
        const saveEvents = _.map(responseBody, (
          {
            id: uuid,
            updated_at: updated,
            title,
            rendered_body: body,
            tags
          }) =>
          this.saveItem({
            uuid,
            updated: moment(updated).unix(),
            title,
            body,
            tags
          })
        )

        Promise.all(saveEvents).then((values) => {
          resolve(values)
        })
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  }
}

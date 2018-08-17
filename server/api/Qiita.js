import request from 'request'
import Promise from 'bluebird'
import _ from 'lodash'
import moment from 'moment'
import qs from 'qs'
import DataBase from './DataBase'
import { generateResult } from './utils/generateResult'

export default class QiitaApi extends DataBase {
  constructor() {
    super()

    this.name = 'qiita'

    this.API_URI = 'http://qiita.com/api/v2/'
    this.API_KEY = ''
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
            return resolve(JSON.parse(body))
          }
          console.error(err)
          return reject(err)
        }
      )
    })
  }

  saveEntries() {
    return new Promise((resolve, reject) => {
      this.fetchItems().then((responseBody) => {
        if(!_.size(responseBody)) {
          return reject()
        }
        const items = _.map(responseBody, ({
            id: uuid,
            created_at: created,
            updated_at: updated,
            title,
            rendered_body: body,
            tags
          }) => ({
            uuid,
            created: moment(created).unix(),
            updated: moment(updated).unix(),
            title,
            body,
            tags: _.map(tags, 'name')
          })
        )

        const tags = _.chain(responseBody)
        .map('tags')
        .flatten()
        .map('name')
        .uniq()
        .value()

        return Promise.all([
          this.saveEntriesEvnets(items),
          this.saveTagsEvents(tags),
          this.removeItems(items),
          this.removeTags(tags)
        ]).then((values) => resolve(generateResult(values)))
      }).catch((err) => {
        console.error(err)
        return reject(err)
      })
    })
  }
}
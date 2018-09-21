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

    this.name = 'instagram'

    this.API_URI = 'https://api.instagram.com/v1/'
    this.API_KEY = ''
  }

  fetchItems() {
    const params = {
      url: `${this.API_URI}users/self/media/recent/?${qs.stringify({ access_token: this.API_KEY })}`,
      method: 'GET',
    }

    console.log(params)

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
      this.fetchItems().then(({ data }) => {
        if(!_.size(data)) {
          return reject()
        }
        const items = _.map(data, ({
            link,
            caption,
            created_time: created,
            images: {
              low_resolution: {
                width: thumbnailWidth,
                height: thumbnailHeight,
                url: thumbnail
              },
              standard_resolution: {
                width: imgWidth,
                height: imgHeight,
                url: img
              }
            },
            tags
          }) => ({
            uuid: link.split('/')[4],
            created: moment(parseInt(created, 10) * 1000).unix(),
            body: caption && caption.text,
            thumbnail,
            thumbnailWidth,
            thumbnailHeight,
            img,
            imgWidth,
            imgHeight,
            tags
          })
        )

        const tags = _.chain(items)
        .map('tags')
        .flatten()
        .compact()
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

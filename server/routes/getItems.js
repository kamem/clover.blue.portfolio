import _ from 'lodash'
import * as db  from '../db'

export function getQiitaItems(req, res, next) {
  getItems('qiitaItems', '', req, res, next)
}
export function getQiitaTags(req, res, next) {
  getItems('qiitaTags', (items) => _.map(items, 'name'), req, res, next)
}
export function getDropboxPaperItems(req, res, next) {
  getItems('dropbox_paperItems', '', req, res, next)
}
export function getDropboxPaperTags(req, res, next) {
  getItems('dropbox_paperTags', (items) => _.map(items, 'name'), req, res, next)
}
export function getInstagramItems(req, res, next) {
  getItems('instagramItems', '', req, res, next)
}

export function getItems(dbName, map, {query: {page, limit, updated}}, res) {

  const query = {}
  if(updated) {
    query.updated = {$gte: updated}
  }

  db[dbName].paginate(query, { page, limit, sort: {created: -1} }, (err, result) => {
    res.json({
      items: map ? map(result.docs) : result.docs,
      currentPage: result.page,
      pageCount: result.pages,
      total: result.total,
    })
  })
}

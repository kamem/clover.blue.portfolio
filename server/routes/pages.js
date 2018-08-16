import _ from 'lodash'
import * as getDb from './getItems'
import settings from '../settings'

function commonRender(req, res, template, title) {
  res.render(
    template,
    {
      env: process.env.NODE_ENV,
      title: `${title || ''}${title ? ` - ${settings.title}` : settings.title}`,
    }
  )
}

let pages = _.map([
  {
    url: '/'
  },
  {
    url: '/about',
    title: 'サイトについて'
  },
], ({ url, title }) => {
  return {
    method: 'get',
    url,
    complete: (req, res) => commonRender(req, res, 'posts/index', title)
  }
})

pages = pages.concat([
  {
    method: 'get',
    url: '/qiita/items',
    complete: getDb.getQiitaItems
  },
  {
    method: 'get',
    url: '/qiita/tags',
    complete: getDb.getQiitaTags
  },
  {
    method: 'get',
    url: '/dropbox/items',
    complete: getDb.getDropboxPaperItems
  },
  {
    method: 'get',
    url: '/dropbox/tags',
    complete: getDb.getDropboxPaperTags
  }
])

export default pages

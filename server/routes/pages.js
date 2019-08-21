import _ from 'lodash'
import settings from '../settings'
import { getItems } from '../api/Firestere'

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
    complete: (err, res) => {
      getItems('qiita').then((data) => {
        res.json({
          items: data
        })
      })
    }
  },
  {
    method: 'get',
    url: '/dropbox/items',
    complete: (err, res) => {
      getItems('dropbox_paper').then((data) => {
        res.json({
          items: data
        })
      })
    }
  },
  {
    method: 'get',
    url: '/instagram/items',
    complete: (err, res) => {
      getItems('instagram', 'created').then((data) => {
        res.json({
          items: data
        })
      })
    }
  }
])

export default pages

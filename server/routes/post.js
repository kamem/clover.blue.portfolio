import settings from '../settings'
import { ROBOT } from '../constants/robot'
import _ from 'lodash'

const db = require('../models/db')

import {
  qiitaItems,
  flickrItems,
  pixivItems,
  tumblrItems,
  tumblrDesigns
} from '../db'

export const sitemap = (req, res) => {
  res.set('Content-Type', 'text/xml')
  new Post(res, req, 'posts/sitemap', settings.title, '')
}
export const feed = (req, res) => {
  res.set('Content-Type', 'text/xml')
  const title = settings.title

  Promise.all([
    qiita(),
    flickr(),
    pixiv(),
    tumblr(),
    designs()
  ]).then(([qiita, flickr, pixiv, tumblr, tumblrDesigns]) => {
    console.log(tumblrDesigns)
    res.render(
      'posts/feed',
      {
        title,
        qiita,
        flickr,
        pixiv,
        tumblr,
        tumblrDesigns
      }
    )
  })
}

export const feedChild = (req, res) => {
  res.set('Content-Type', 'text/xml')
  const title = `posts/${req.path.slice(1)}`
  const template = settings.title
  new Post(res, req, title, template, '')
}

export const feedDesign = (req, res) => {
  res.set('Content-Type', 'text/xml')
  tumblrDesigns.find({}).sort('-updated').exec((err, tumblrDesignPosts) => {
    res.render(`posts/${req.path.slice(1)}`, {
      title: settings.title,
      tumblrDesigns: tumblrDesignPosts
    })
  })
}

export const template = (req, res) => {
  res.render(req.path.slice(1))
}

export const index = (req, res) => {
  const title = settings.title
  const template = 'posts/index'
  new Post(res, req, template, title, '')
}

export const about = (req, res) => {
  const title = `サイトについて - ${settings.title}`
  const template = 'posts/about'
  new Post(res, req, template, title, '')
}

export const design = (req, res) => {
  const title = `デザイン - ${settings.title}`
  const template = 'posts/design'
  tumblrDesigns.find({}).exec((err, post) => {
    new Post(res, req, template, title, post)
  })
}

export const photo = (req, res) => {
  const title = `写真 - ${settings.title}`
  const template = 'posts/photo'
  new Post(res, req, template, title, '')
}
export const weblog = (req, res) => {
  const title = `記事 - ${settings.title}`
  const template = 'posts/weblog'
  new Post(res, req, template, title, '')
}
export const illust = (req, res) => {
  const title = `イラスト - ${settings.title}`
  const template = 'posts/illust'
  new Post(res, req, template, title, '')
}

export const diary = (req, res) => {
  const title = `日記 - ${settings.title}`
  const template = 'posts/diary'
  new Post(res, req, template, title, '')
}
export const tag = (req, res) => {
  const title = settings.title
  const template = 'posts/tags/tag'
  new Post(res, req, template, title, '')
}

export const entry = (req, res) => {
  const uuid = req.route.path.replace('/items/', '')
  const template = 'posts/items/entry'
  qiitaItems.findOne({ uuid }).exec((err, post) => {
    const title = `${post.title} - ${settings.title}`
    new Post(res, req, template, title, post)
  })
}

export const diaryEntry = (req, res) => {
  const uuid = req.route.path.replace('/post/', '')
  const template = 'posts/post/entry'
  tumblrItems.findOne({ uuid }).exec((err, post) => {
    const title = `${post.title} - ${settings.title}`
    new Post(res, req, template, title, post)
  })
}

const qiita = () => new Promise((resolve, reject) => {
  qiitaItems.find({}).sort('-updated').exec((err, qiitaPosts) => {
    if (err) {
      reject(err)
      return
    }
    resolve(qiitaPosts)
  })
})
const flickr = () => new Promise((resolve, reject) => {
  flickrItems.find({}).sort('-updated').exec((err, flickPosts) => {
    if (err) {
      reject(err)
      return
    }
    resolve(flickPosts)
  })
})
const pixiv = () => new Promise((resolve, reject) => {
  pixivItems.find({}).sort('-updated').exec((err, pixivPosts) => {
    if (err) {
      reject(err)
      return
    }
    resolve(pixivPosts)
  })
})
const tumblr = () => new Promise((resolve, reject) => {
  tumblrItems.find({}).sort('-updated').exec((err, tumblrPosts) => {
    if (err) {
      reject(err)
      return
    }
    resolve(tumblrPosts)
  })
})

const designs = () => new Promise((resolve, reject) => {
  tumblrDesigns.find({}).sort('-updated').exec((err, tumblrDesignPosts) => {
    if (err) {
      reject(err)
      return
    }
    resolve(tumblrDesignPosts)
  })
})

const Post = (res, req, template, title, item) => {
  const ua = JSON.stringify(req.headers['user-agent'])
  const isRobot = _.some(ROBOT, (name) => ua.indexOf(name) >= 0)
  const robotDirectory = isRobot ? 'robot/' : ''
  Promise.all([
    qiita(),
    flickr(),
    pixiv(),
    tumblr()
  ]).then(([qiita, flickr, pixiv, tumblr]) => {
    res.render(
      robotDirectory + template,
      {
        env: process.env.NODE_ENV,
        title,
        qiita,
        flickr,
        pixiv,
        tumblr,
        item
      }
    )
  })
}

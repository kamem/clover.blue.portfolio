import mongo from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

mongo.Promise = global.Promise

const tags = new mongo.Schema({
  name: String
});

const entry = new mongo.Schema({
  created: {type: Number, min: 0, default: 0},
  updated: {type: Number, min: 0, default: 0},
  uuid: String,
  title: String,
  body: String,
  tags: Array
})

tags.plugin(mongoosePaginate)
entry.plugin(mongoosePaginate)

// Qiita
export const qiitaItems = mongo.model(
  'qiita_items',
  entry
)
export const qiitaTags = mongo.model(
  'qiita_tags',
  tags
)


// Flickr
export const flickrItems = mongo.model(
  'flickr_items',
  mongo.Schema({
    updated: {type: Number, min: 0, default: 0},
    uuid: String,
    title: String,
    farm: String,
    server: String,
    secret: String
  })
)

// Pixiv
export const pixivTags = mongo.model(
  'pixiv_tags',
  tags
)

export const pixivItems = mongo.model(
  'pixiv_items',
  mongo.Schema({
    updated: {type: Number, min: 0, default: 0},
    uuid: String,
    title: String,
    img: String,
    thumbnail: String
  })
);

// Tumblr
export const tumblrItems = mongo.model(
  'tumblr_items',
  mongo.Schema({
    updated: {type: Number, min: 0, default: 0},
    uuid: String,
    title: String,
    body: String,
    tags: Array,
    type: String
  })
);
export const tumblrTags = mongo.model(
  'tumblr_tags',
  tags
);
export const tumblrDesigns = mongo.model(
  'tumblr_designs',
  mongo.Schema({
    updated: {type: Number, min: 0, default: 0},
    uuid: String,
    url: String,
    title: String,
    tags: Array
  })
);

// Dropbox
export const dropbox_paperItems = mongo.model(
  'dropbox_paper_items',
  entry
)
export const dropbox_paperTags = mongo.model(
  'dropbox_paper_tags',
  tags
)

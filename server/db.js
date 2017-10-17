import mongo from 'mongoose'

mongo.Promise = global.Promise

const tags = mongo.Schema({
  name: String
});

// Qiita
export const qiitaItems = mongo.model(
  'qiita_items',
  mongo.Schema({
    updated: String,
    uuid: String,
    title: String,
    body: String,
    tags: Array
  })
)
export const qiitaTags = mongo.model(
  'qiita_tags',
  tags
)


// Flickr
export const flickrItems = mongo.model(
  'flickr_items',
  mongo.Schema({
    updated: String,
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
    updated: String,
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
    updated: String,
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
    updated: String,
    uuid: String,
    url: String,
    title: String,
    tags: Array
  })
);

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

// Instagram
const instagram = new mongo.Schema({
  created: {type: Number, min: 0, default: 0},
  uuid: String,
  body: String,
  thumbnail: String,
  thumbnailWidth: {type: Number, min: 0, default: 0},
  thumbnailHeight: {type: Number, min: 0, default: 0},
  img: String,
  imgWidth: {type: Number, min: 0, default: 0},
  imgHeight: {type: Number, min: 0, default: 0},
  tags: Array
})

instagram.plugin(mongoosePaginate)
export const instagramItems = mongo.model(
  'instagram_items',
  instagram
);
export const instagramTags = mongo.model(
  'instagram_tags',
  tags
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

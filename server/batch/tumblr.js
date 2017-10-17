const request = require('request');
const apiToDatabase = require('./apiToDatabase');
const cloverBlueDb = require('../db');

const API_URI = 'https://api.tumblr.com/v2/';
const API_KEY = 'hOCZhmORpcUgzzDFAJJ2Zq1aTckafCrYw9FoWp2up0EcdvuOYU';
const BLOG_HOST = 'clover-blue.tumblr.com';
const dbItems = new apiToDatabase.Items('tumblr');
const SaveApi = (function () {
  function SaveApi() {
    request.get(`${API_URI}blog/${BLOG_HOST}/posts?api_key=${API_KEY}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const items = JSON.parse(body).response.posts;
        dbItems.saveDatabase(items, {
          uuid: 'id',
          updated: 'timestamp',
          title: 'title',
          body: 'body',
          tags: 'tags',
          type: 'type'
        });
        const name = 'tumblrDesigns';
        items.forEach((item) => {
          cloverBlueDb[name].find({}, (err, posts) => {
            posts.forEach((post) => {
              if (!dbItems.isIdExists(post.uuid, items, 'uuid')) {
                cloverBlueDb[name].remove({ uuid: post.uuid }, (err) => {
                });
              }
            });
          });
          if (item.type === 'photo') {
            for (let i = 0; i < item.photos.length; i++) {
              dbItems.saveItem(name, {
                updated: item.timestamp,
                uuid: item.id,
                url: item.photos[i].original_size.url,
                title: item.caption,
                tags: item.tags
              });
            }
          }
        });
        console.log('complate!');
      } else {
        console.log(error);
      }
    });
  }
  return SaveApi;
}());
exports.SaveApi = SaveApi;
const save = new SaveApi();

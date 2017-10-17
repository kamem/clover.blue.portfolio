const db = require('../models/db');
const cloverBlueDb = require('../db');

import _ from 'lodash'

const Items = (function () {
  function Items(name) {
    this.name = name;
  }
  Items.prototype.saveDatabase = function (items, itemInfoName) {
    const tags = {};
    this.removeUnnecessaryDbItem(`${this.name}Items`, items, itemInfoName.uuid);
    items.forEach((item) => {
      const itemInfo = {};
      for (const info in itemInfoName) {
        const itemInfoVal = item[itemInfoName[info]];
        if (info === 'updated') {
          itemInfo[info] = typeof itemInfoVal === 'string' ? Date.parse(itemInfoVal) : itemInfoVal;
        } else if (info === 'tags') {
          const itemTags = [];
          for (var i = item.tags.length - 1; i >= 0; i--) {
            var tagName = item.tags[i].name ? item.tags[i].name : item.tags[i];
            itemTags.push(tagName);
          }

          itemInfo[info] = itemTags;
        } else {
          itemInfo[info] = itemInfoVal;
        }
      }
      console.log(itemInfo.uuid)
      this.saveItem(`${this.name}Items`, itemInfo);
      for (var i = item.tags.length - 1; i >= 0; i--) {
        var tagName = item.tags[i].name ? item.tags[i].name : item.tags[i];
        tags[tagName] = tagName;
      }
    });
    const tagNames = [];
    for (const tag in tags) {
      tagNames.push(tag);
    }
    this.removeUnnecessaryDbTag(`${this.name}Tags`, tagNames, '');
    tagNames.forEach((tagName) => {
      this.saveTag(`${this.name}Tags`, tagName);
    });
  };
  Items.prototype.removeItems = function (name) {
    if (cloverBlueDb[name]) {
      cloverBlueDb[name].remove({}, (err) => {
      });
    }
  };
  Items.prototype.removeUnnecessaryDbItem = function (name, items, subscript) {
    cloverBlueDb[name].find({}, (err, posts) => {
      posts.forEach((post) => {
        if (!this.isIdExists(post.uuid, items, subscript)) {
          cloverBlueDb[name].remove({ uuid: post.uuid }, (err) => {
          });
        }
      });
    });
  };
  Items.prototype.removeUnnecessaryDbTag = function (name, tags, subscript) {
    cloverBlueDb[name].find({}, (err, posts) => {
      posts.forEach((post) => {
        if (!this.isIdExists(post.name, tags, subscript)) {
          cloverBlueDb[name].remove({ name: post.name }, (err) => {
          });
        }
      });
    });
  };
  Items.prototype.isIdExists = function (value, items, subscript) {
    let isValue = false;
    items.forEach((item) => {
      const target = (subscript ? item[subscript] : item);
      const val = typeof target === typeof value ? value : parseInt(value);
      if (target === val) {
        isValue = true;
      }
    });
    return isValue;
  };
  Items.prototype.saveItem = function (name, itemInfo) {
    cloverBlueDb[name].where({ uuid: itemInfo.uuid }).count((err, count) => {
      if (count) {
        cloverBlueDb[name].findOne({ uuid: itemInfo.uuid }, (err, post) => {
          for (const info in itemInfo) {
            post[info] = itemInfo[info];
          }
          post.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      } else {
        const item = new cloverBlueDb[name](itemInfo);
        item.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  };
  Items.prototype.saveTag = function (name, tagName) {
    cloverBlueDb[name].where({ name: tagName }).count((err, count) => {
      if (count) {
        cloverBlueDb[name].findOne({ name: tagName }, (err, tag) => {
          tag.name = tagName;
          tag.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        });
      } else {
        const Tag = new cloverBlueDb[name]({
          name: tagName
        });
        Tag.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  };
  return Items;
}());
exports.Items = Items;

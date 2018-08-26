import _ from 'lodash'
import moment from 'moment'
import Promise from 'bluebird'
import * as cloverBlueDb from '../db'

export default class DataBase {

  // uuidから登録されている1件データをとってくる
  getItem(uuid) {
    const itemsName = `${this.name}Items`
    return new Promise((resolve, reject) => {
      cloverBlueDb[itemsName].findOne({ uuid },
        (err, post) => {
          if(err) {
            reject(err)
          } else {
            resolve(post)
          }
        })
    })
  }

  // uuidをもとに更新する
  updateItem(uuid, item) {
    return new Promise((resolve, reject) => {
      this.getItem(uuid).then((post) => {
        if(
          post.updated !== item.updated ||
          post.body !== item.body ||
          post.title !== item.title ||
          !_.isEmpty(_.xor(post.tags, item.tags))
        ) {
          for(const val in item) {
            post[val] = item[val]
          }
          post.save((err) => {
            if(err) {
              reject(err)
            } else {
              const format = 'YYYY年MM月DD日 HH:mm:ss'
              console.log(`updated item! 【${moment.unix(post.updated).format(format)} > ${moment.unix(item.updated).format(format)}】`, uuid, item.title)
              resolve(item)
            }
          })
        } else {
          resolve()
          return console.log('nochange item!', uuid, item.title)
        }
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  }

  // 記事を新しく登録する
  createItem(item) {
    const itemsName = `${this.name}Items`
    const dbItem = new cloverBlueDb[itemsName](item);

    return new Promise((resolve, reject) => {
      dbItem.save((err) => {
        if(err) {
          reject(err)
        } else {
          console.log('created item!', item.uuid, item.title)
          resolve(item)
        }
      })
    })
  }

  // itemからuuidで検索して1つでもあった場合はupdate、なかった場合はcreate
  saveItem(item) {
    const { uuid } = item
    const itemsName = `${this.name}Items`

    return new Promise((resolve, reject) => {
      cloverBlueDb[itemsName].where({ uuid })
      .count((err, count) => {
        if(err) {
          console.error(err)
          reject(err)
        }
        if(count) {
          this.updateItem(uuid, item).then((updateItem) =>
            resolve(updateItem && Object.assign({}, item, { isUpdated: true }))
          ).catch((itemErr) => {
            console.error(itemErr)
            reject(itemErr)
          })
        } else {
          this.createItem(item).then(() =>
            resolve(Object.assign({}, item, { isCreated: true }))
          ).catch((itemErr) => {
            console.error(itemErr)
            reject(itemErr)
          })
        }
      })
    })
  }

  // 存在しない記事削除
  removeItem(uuid) {
    return new Promise((resolve, reject) => {
      this.getItem(uuid).then((item) => {
        item.remove({}, (err) => {
          if(err) {
            reject(err)
          } else {
            console.log('remove item!', item.uuid, item.title)
            resolve()
          }
        })
      }).catch((err) => {
        console.error(err)
      })
    })
  }


  removeItems(items) {
    return this.removeDBItems(`${this.name}Items`, items, 'uuid', ::this.removeItem)
  }


  // タグを1件取得する
  getTag(tagName) {
    const TagsName = `${this.name}Tags`
    return new Promise((resolve, reject) => {
      cloverBlueDb[TagsName].findOne(
        { name: tagName },
        (err, tag) => {
          if(err) {
            reject(err)
          }
          resolve(tag)
        }
      )
    })
  }

  // タグを新しく登録する
  createTag(tagName) {
    const TagsName = `${this.name}Tags`
    const dbTag = new cloverBlueDb[TagsName]({
      name: tagName
    })

    return new Promise((resolve, reject) => {
      dbTag.save((err) => {
        if(err) {
          reject(err)
        } else {
          console.log('created tag!', tagName)
          resolve(tagName)
        }
      })
    })
  }

  // 存在しないタグ削除
  removeTag(tagName) {
    return new Promise((resolve, reject) => {
      this.getTag(tagName).then((tag) => {
        tag.remove({}, (err) => {
          if(err) {
            reject(err)
          } else {
            console.log('remove tag!', tagName)
            resolve(tagName)
          }
        })
      }).catch((err) => {
        console.error(err)
      })
    })
  }

  removeTags(items) {
    return this.removeDBItems(`${this.name}Tags`, items, 'name', ::this.removeTag)
  }

  // tagからタグ名で検索して1つでもあった場合はupdate、なかった場合はcreate
  saveTag(tagName) {
    const TagsName = `${this.name}Tags`

    return new Promise((resolve, reject) => {
      cloverBlueDb[TagsName].where({ name: tagName })
      .count((err, count) => {
        if(err) {
          console.error(err)
          reject(err)
        }
        if(count) {
          resolve()
          console.log('nochange tag!', tagName)
        } else {
          this.createTag(tagName).then(() =>
            resolve(tagName)
          ).catch((errTag) => {
            console.error(errTag)
            reject(errTag)
          })
        }
      })
    })
  }


  saveEntriesEvnets(items) {
    const saveEvents = _.map(items, (item) =>
      this.saveItem(item)
    )

    return new Promise((resolve, reject) => {
      Promise.all(saveEvents).then((values) => {
        const updatedEntries = _.chain(values).filter((item) => item && item.isUpdated)
        .map((item) => {
          delete item.isUpdated
          return item
        })
        .value()
        const createdEntries = _.chain(values).filter((item) => item && item.isCreated)
        .map((item) => {
          delete item.isCreated
          return item
        })
        .value()

        resolve([updatedEntries, createdEntries])
      }).catch((err) => {
        reject(err)
      })
    })
  }

  saveTagsEvents(tags) {
    const saveTags = _.map(tags, (tag) =>
      this.saveTag(tag)
    )

    return new Promise((resolve, reject) => {
      Promise.all(saveTags).then((values) => {
        resolve(_.compact(values))
      }).catch((err) => {
        reject(err)
      })
    })
  }

  removeDBItems(ItemsName, items, target, removeEvent) {
    return new Promise((resolve, reject) => {
      cloverBlueDb[ItemsName].find({}, (err, post) => {
        if(err) {
          console.error(err)
          reject(err)
        }

        const filteredItems = _.filter(post, (postItem) => !_.some(items, (item) => (item[target] || item) === postItem[target]))

        Promise.all(
          filteredItems.map((item) => removeEvent(item[target]))
        ).then(() => {
          resolve(filteredItems)
        }).catch((errItems) => {
          console.error(errItems)
          reject(errItems)
        })
      })
    })
  }
}

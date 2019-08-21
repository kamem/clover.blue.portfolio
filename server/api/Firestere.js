import _ from 'lodash'
import moment from 'moment'
import Promise from 'bluebird'

import admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.applicationDefault()
})

const db = admin.firestore()
const format = 'YYYY年MM月DD日 HH:mm:ss'

// 取得
export const getItem = (uuid = null, itemsName) => {
  const docRef = db.collection(itemsName).doc(uuid)
  return new Promise((resolve, reject) => {
    docRef.get().then((doc) => {
      resolve(doc.exists ? doc.data() : undefined)
    }).catch((error) => {
      reject(error)
    })
  })
}
// 複数取得
export const getItems = (itemsName, orderBy = 'updated', sort = 'desc') => new Promise((resolve, reject) => {
  db.collection(itemsName).orderBy(orderBy, sort).get().then((data) => {
    const ary = []
    data.forEach((doc) => {
      ary.push(doc.data())
    })
    resolve(ary)
  })
  .catch((err) => {
    console.error(err)
    reject(err)
  })
})

// 作成・更新処理
export const saveEntry = (item, itemsName, message) => {
  const docRef = db.collection(itemsName).doc(item.uuid)

  return new Promise((resolve, reject) => docRef.set(item, { merge: true })
    .then(() => {
      console.log(message)
      resolve(item)
    })
    .catch((error) => {
      console.error(error)
      reject(error)
    }))
}
export const saveItem = (item, itemsName) => new Promise((resolve, reject) => {
  getItem(item.uuid, itemsName).then((post = {}) => {
    const message = !post ? `created item! ${item.uuid} ${item.title}` :
    `updated item! 【${moment.unix(post.updated).format(format)} > ${moment.unix(item.updated).format(format)}】${item.uuid} ${item.title}`

    if(!_.isEqual(post, item)) {
      return saveEntry(item, itemsName, message).then((data) => {
        resolve(Object.assign({}, data, { [!post ? 'isCreated' : 'isUpdated']: true }))
      })
    }

    resolve(item)
    return console.log('nochange item!', item.uuid, item.title)
  }).catch((err) => {
    console.error(err)
    reject(err)
  })
})

export const saveEntriesEvents = (items, itemsName) => {
  const saveEvents = _.map(items, (item) => saveItem(item, itemsName))

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

// 削除
export const removeItem = (item, itemsName) => {
  const docRef = db.collection(itemsName).doc(item.uuid)
  return new Promise((resolve, reject) => {
    docRef.delete().then(() => {
      console.log('remove item!', item.uuid, item.title)
      resolve(item)
    }).catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}

export const removeItems = (items, itemsName, target = 'uuid') => new Promise((resolve, reject) => {
  getItems(itemsName).then((data) => {
    const ary = []

    data.forEach((doc) => {
      if(!_.includes(_.map(items, target), doc[target])) {
        ary.push(removeItem(doc, itemsName))
      }
    })

    Promise.all(ary).then((res) => {
      resolve(_.compact(res))
    })
  }).catch((err) => {
    console.error(err)
    reject(err)
  })
})

import Qiita from '../api/Qiita'

const api = new Qiita()
api.API_KEY = '20e2a912d33f6f9779faa71522d5baacef437a27'

api.saveEntries().then(() => {
  console.log('complated!!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

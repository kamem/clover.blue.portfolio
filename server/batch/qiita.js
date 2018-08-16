import Qiita from '../api/Qiita'

const api = new Qiita()

api.saveEntries().then(() => {
  console.log('complated!!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

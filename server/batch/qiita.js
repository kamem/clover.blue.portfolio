import QiitaApi from '../api/QiitaApi'

const qiitaApi = new QiitaApi();
qiitaApi.saveEntries().then(() => {
  console.log('complated!!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

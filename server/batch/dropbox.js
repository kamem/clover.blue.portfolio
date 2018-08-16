import DropboxApi from '../api/Dropbox'

const api = new DropboxApi();
api.saveEntries().then(() => {
  console.log('complated!!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

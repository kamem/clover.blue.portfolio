import InstagramApi from '../api/Instagram'

const api = new InstagramApi();

api.saveEntries().then(() => {
  console.log('complated!!')
  process.exit(0)
}).catch((err) => {
  console.log(err)
  process.exit(1)
})

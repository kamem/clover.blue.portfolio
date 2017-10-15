import request from 'request'
import apiToDatabase from './apiToDatabase'
import apiToDatabase2 from './apiToDatabase2'

export class QiitaApi extends apiToDatabase2 {
	constructor() {
		super()

		this.name = 'qiita'

		this.API_URI = 'https://qiita.com/api/v1/'
		this.USER_NAME = 'kamem';
		this.dbItems = new apiToDatabase.Items('qiita')
		this.API_PATH = `${this.API_URI}/users/${this.USER_NAME}/items`
	}

	fetch() {
		return new Promise((resolve, reject) => {
			request.get(
				this.API_PATH,
				(err, response, body) => {
					if (!err && response.statusCode == 200) {
						resolve(JSON.parse(body))
					} else {
						console.log(err);
						reject(err)
					}
				}
			);
		})
	}

	getApi() {
		this.getItem('dabc1bca30486283cc75').then((post) => {
		console.log(post)
		})
	}

	save() {
		return new Promise((resolve, reject) => {
			this.fetch().then((body) => {
				this.dbItems.saveDatabase(
					body,
					{
						uuid: 'uuid',
						updated: 'updated_at',
						title: 'title',
						body: 'body',
						tags: 'tags'
					}
				)

				console.log('complate!');
				resolve()
			}).catch((err) => {
				console.log(err)
				reject(err)
			})
		})
    }
}


const qiitaApi = new QiitaApi();
qiitaApi.getApi()
// qiitaApi.save().then(() =>
// 	process.exit(0)
// ).catch(() =>
// 	process.exit(1)
// )

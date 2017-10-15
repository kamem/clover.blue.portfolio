import request from 'request'
import apiToDatabase from './apiToDatabase'
import { createFlickrApiUrl } from '../util/api/createApiUrl'
var API_URI = 'https://api.flickr.com/services/rest/';
var API_KEY = '982ed6872b004b1e646a71f4f5a9970f';
var USER_ID = '37978321@N03';
var MAX = 100;
var dbItems = new apiToDatabase.Items('flickr');
var SaveApi = (function () {
	function SaveApi() {
		const photosSearchUrl = createFlickrApiUrl(
			API_URI,
			{
				method: ['photos', 'search'],
				api_key: API_KEY,
				user_id: USER_ID
			}
		);
		let photosCount = 0;
		let items = [];
		request.get(photosSearchUrl, (error, res, body) => {
		    const photos = JSON.parse(res.body).photos.photo
			photos.forEach((photo) => {
		        const photo_id = photo.id

				const getInfoApiUrl = createFlickrApiUrl(
				    API_URI, {
						method: ['photos', 'getInfo'],
						api_key: API_KEY,
						photo_id
				    }
				);
				request.get(getInfoApiUrl, (error, res, body) => {
					const item = JSON.parse(res.body).photo
					photosCount++;
					items.push(item);
					dbItems.saveItem('flickrItems', {
						uuid: item.id,
						updated: item.dateuploaded,
						title: item.title._content,
						farm: item.farm,
						server: item.server,
						secret: item.secret
					});
					if (photosCount === MAX) {
						dbItems.removeUnnecessaryDbItem('flickrItems', items, 'id');
						console.log('complate!');
					}
				});
			});
		});
	}
	return SaveApi;
})();
exports.SaveApi = SaveApi;
var save = new SaveApi();

save.fetch().then(() =>
	process.exit(0)
).catch(() =>
	process.exit(1)
)

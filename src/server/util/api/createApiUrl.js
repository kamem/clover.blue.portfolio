import _ from 'lodash'

/*
 createFlickrApiUrl

 url: ''
 search: {
	 method: ['photos', 'getInfo'],
	 api_key: API_KEY,
	 photo_id: photo.id
 }
*/
export const createFlickrApiUrl = (url, search) => {
	return url + '?' + createFlickrParams(search).join('&') + '&format=json&nojsoncallback=1';
}

const createFlickrParams = (search) => {
	return _.map(search, (value, key) => {
		if (!value) return []
		if (key === 'method') {
			const [type, info] = value
			return key + '=flickr.' + type + '.' + info
		} else {
			return key + '=' + value
		}
	})
};
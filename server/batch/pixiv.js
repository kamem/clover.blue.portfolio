const request = require('request');
const apiToDatabase = require('./apiToDatabase');

const API_URI = 'http://spapi.pixiv.net/iphone/member_illust.php';
const USER_ID = 112090;
const dbItems = new apiToDatabase.Items('pixiv');
const SaveApi = (function () {
  function SaveApi() {
    request.get(`${API_URI}?id=${USER_ID}`, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const res = body.split(',');
        const it = [];
        res.forEach((item, i) => {
          if (!!item && item !== '' && item !== '0') {
            it.push(item);
          }
        });
        const items = [];
        let itemNum = 0;
        it.forEach((item, i) => {
          if (item.indexOf('\n') >= 0) { itemNum++; }
          if (!items[itemNum]) { items[itemNum] = []; }
          items[itemNum].push(item.replace('\n', '').replace(/\"/g, ''));
        });
        items.pop();
        const pixivs = [];
        items.forEach((item, i) => {
          pixivs[i] = {};
          pixivs[i].uuid = item[0];
          pixivs[i].updated = item[8];
          pixivs[i].title = item[14];
          pixivs[i].img = item[7];
          pixivs[i].tags = item[9].split(' ');
          pixivs[i].thumbnail = item[6];
        });
        dbItems.saveDatabase(pixivs, {
          uuid: 'uuid',
          updated: 'updated',
          title: 'title',
          img: 'img',
          tags: 'tags',
          thumbnail: 'thumbnail'
        });
        console.log('complate!');
      } else {
        console.log(error);
      }
    });
  }
  return SaveApi;
}());
exports.SaveApi = SaveApi;
const save = new SaveApi();

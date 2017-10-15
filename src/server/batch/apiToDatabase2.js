import * as cloverBlueDb from '../db'

export default class DataBase {

	// uuidから登録されている1件データをとってくる
	getItem(uuid) {
		const itemsName = `${this.name}Items`
		return new Promise((resolve, reject) => {
			cloverBlueDb[itemsName].findOne({ uuid },
				(err, post) => {
					if(err) {
						reject(err)
					}
					resolve(post)
				})
		})
	}

	// uuidをもとに更新する
	updateItem(uuid, item) {
		this.getItem(uuid).then((post) => {
			for (const val in item) {
				post[val] = item[val]
			}
			post.save((err) => {
				if (err) {
					console.log(err);
				}
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	// 記事を新しく登録する
	createItem(item) {
		const itemsName = `${this.name}Items`
		const dbItem = new cloverBlueDb[itemsName](item);
		dbItem.save((err) => {
			if (err) {
				console.log(err);
			}
		})
	}

	// itemからuuidで検索して1つでもあった場合はupdate、なかった場合はcreate
	saveItem(item) {
		const { uuid } = item
		const itemsName = `${this.name}Items`
		cloverBlueDb[itemsName].where({ uuid })
			.count((err, count) => {
				if (count) {
					this.updateItem(uuid, item)
				} else {
					this.createItem(item)
				}
			})
	}


	// タグを1件取得する
	getTag(tagName) {
		return new Promise((resolve, reject) => {
			cloverBlueDb[name].findOne(
				{ name: tagName },
				(err, tag) => {
					if(err) {
						reject(err)
					}
					resolve(tag)
				}
			);
		})
	}

	// タグ名をもとに更新する
	updateTag(tagName) {
		this.getTag(tagName).then((tag) => {
			tag.name = tagName;
			tag.save((err) => {
				if (err) {
					console.log(err)
				}
			})
		}).catch((err) => {
			console.log(err)
		})
	}

	// タグを新しく登録する
	createTag(tagName) {
		const TagsName = `${this.name}Tags`
		const dbTag = new cloverBlueDb[TagsName]({
			name: tagName
		});
		dbTag.save((err) => {
			if (err) {
				console.log(err);
			}
		})
	}

	// tagからタグ名で検索して1つでもあった場合はupdate、なかった場合はcreate
	saveTag(tagName) {
		const TagsName = `${this.name}Tags`
		cloverBlueDb[TagsName].where({ name: tagName }).count(function (err, count) {
			if (count) {
				this.updateTag(tagName)
			}
			else {
				this.createTag(tagName)
			}
		});
	}
}
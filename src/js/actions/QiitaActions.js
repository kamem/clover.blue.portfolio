import { ajax } from '../utils/Ajax'

export const FEATCH_QIITA_ITEMS = Symbol()

export function featchItesm(limit = 100) {
  return (dispatch) => {
    return ajax.get('/qiita/items', {
      params: {
        page: 1,
        limit: 1000
      }
    })
    .then(({data}) => data)
    .then((payload) => {
      dispatch({ type: FEATCH_QIITA_ITEMS, ...payload })
      return payload
    })
  }
}

export const CHANGE_ITEM = 'CHANGE_ITEM'
export function changeItem(id) {
  dispatch({ type: CHANGE_ITEM, id })
}

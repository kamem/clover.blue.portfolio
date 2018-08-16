import * as ActionTypes from '../actions/DropboxActions'

const initialState = {
  items: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FEATCH_DROPBOX_ITEMS : {
      return Object.assign({}, state, {
        items: action.items
      })
    }
    default :
      return state;
  }
}

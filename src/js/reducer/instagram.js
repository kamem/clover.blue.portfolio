import * as ActionTypes from '../actions/InstagramActions'

const initialState = {
  items: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FEATCH_INSTAGRAM_ITEMS : {
      return Object.assign({}, state, {
        items: action.items
      })
    }
    default :
      return state;
  }
}

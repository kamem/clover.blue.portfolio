import _ from 'lodash';
import moment from 'moment';
import * as ActionTypes from '../actions/QiitaActions';

const initialState = {
  items: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FEATCH_QIITA_ITEMS : {
      return Object.assign({}, state, {
        items: action.items
      })
    }
    default :
      return state;
  }
}

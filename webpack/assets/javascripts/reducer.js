import {combineReducers} from 'redux'
import * as actions from './actions'
import {handleActions} from 'redux-actions'
import modes from './modes'

const reducers = {
  configuration (state = {}, action) {
    return state
  },

  mode: handleActions({
    [actions.START_CHALLENGE]: () => modes.CHALLENGE,
    [actions.QUIT_CHALLENGE]: () => modes.CONFIGURE,
  }, modes.CONFIGURE),
}

const reducer = combineReducers(reducers)
export default reducer

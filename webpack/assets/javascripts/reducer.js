import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import modes from './modes'

const defaultOperands = [5, 5]

function newOperands (state, action) {
  const {operandIndex, operandValue} = action.payload
  const newState = [...state]
  newState[operandIndex] = operandValue
  return newState
}

const configurationReducers = {
  operands: handleActions({
    [actions.CHANGE_OPERAND]: newOperands,
  }, defaultOperands),
}

const reducers = {
  configuration: combineReducers(configurationReducers),

  mode: handleActions({
    [actions.START_CHALLENGE]: () => modes.CHALLENGE,
    [actions.QUIT_CHALLENGE]: () => modes.CONFIGURE,
  }, modes.CONFIGURE),
}

const reducer = combineReducers(reducers)
export default reducer

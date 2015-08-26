import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import {MODES} from './constants'

const defaultOperands = [5, 5]

function fsaIdentity (state, action) { return action.payload }

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

  operator: handleActions({
    [actions.CHANGE_OPERATOR]: fsaIdentity,
  }, '+'),
}

const reducers = {
  configuration: combineReducers(configurationReducers),

  mode: handleActions({
    [actions.START_CHALLENGE]: () => MODES.challenge,
    [actions.QUIT_CHALLENGE]: () => MODES.configure,
  }, MODES.configure),
}

const reducer = combineReducers(reducers)
export default reducer

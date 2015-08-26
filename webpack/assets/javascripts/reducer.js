import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import {MODES, OPERATORS} from './constants'

const defaultOperands = [5, 5]

function fsaIdentity (state, action) { return action.payload }

function newOperands (state, action) {
  const {operandIndex, operandValue} = action.payload
  const newState = [...state]
  newState[operandIndex] = operandValue
  return newState
}

function generateProblem (state, action) {
  return state
}

const configurationReducers = {
  operands: handleActions({
    [actions.CHANGE_OPERAND]: newOperands,
  }, defaultOperands),

  operator: handleActions({
    [actions.CHANGE_OPERATOR]: fsaIdentity,
  }, '+'),
}

const challengeReducers = {
  problem: handleActions({
    [actions.START_CHALLENGE]: generateProblem,
  }, {
    operands: [1, 1],
    operator: OPERATORS.plus,
  }),
}

const reducers = {
  configuration: combineReducers(configurationReducers),

  challenge: combineReducers(challengeReducers),

  mode: handleActions({
    [actions.START_CHALLENGE]: () => MODES.challenge,
    [actions.QUIT_CHALLENGE]: () => MODES.configure,
  }, MODES.configure),

}

const reducer = combineReducers(reducers)
export default reducer

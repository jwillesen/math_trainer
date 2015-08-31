import {combineReducers} from 'redux'
import {handleActions} from 'redux-actions'
import * as actions from './actions'
import {MODES, OPERATORS} from './constants'

const defaultOperands = [5, 5]

const defaultOperators = {
  [OPERATORS.plus]: true,
  [OPERATORS.minus]: false,
  [OPERATORS.times]: false,
}

const defaultProblem = {
  operands: [1, 1],
  operator: OPERATORS.plus,
  answer: 2,
}

function fsaIdentity (state, action) { return action.payload }

function newOperands (state, action) {
  const {operandIndex, operandValue} = action.payload
  const newState = [...state]
  newState[operandIndex] = operandValue
  return newState
}

function resetTimer (state, action) {
  return {start: Date.now()}
}

function toggleOperator (state, action) {
  const oldValue = state[action.payload]
  if (oldValue === undefined) return state
  const newState = {...state, [action.payload]: !oldValue}
  return newState
}

export const configurationReducers = {
  operands: handleActions({
    [actions.CHANGE_OPERAND]: newOperands,
  }, defaultOperands),

  operators: handleActions({
    [actions.TOGGLE_OPERATOR]: toggleOperator,
  }, defaultOperators),
}

export const challengeReducers = {
  problem: handleActions({
    [actions.NEW_PROBLEM]: fsaIdentity,
  }, defaultProblem),

  showAnswer: handleActions({
    [actions.TOGGLE_SHOW_ANSWER]: state => !state,
    [actions.NEW_PROBLEM]: () => false,
  }, false),

  time: handleActions({
    [actions.START_CHALLENGE]: resetTimer,
  }, resetTimer()),
}

export const reducers = {
  configuration: combineReducers(configurationReducers),

  challenge: combineReducers(challengeReducers),

  mode: handleActions({
    [actions.START_CHALLENGE]: () => MODES.challenge,
    [actions.QUIT_CHALLENGE]: () => MODES.configure,
  }, MODES.configure),
}

const reducer = combineReducers(reducers)
export default reducer

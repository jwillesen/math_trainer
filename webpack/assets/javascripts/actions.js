import {createAction} from 'redux-actions'
import Chance from 'chance'

const stdrng = new Chance()

export function generateRandomProblem (configuration, rng = stdrng) {
  const operands = [
    rng.integer({min: 1, max: configuration.operands[0]}),
    rng.integer({min: 1, max: configuration.operands[1]}),
  ]
  return {
    operands,
    operator: configuration.operator,
    answer: operands.reduce((memo, next) => memo + next),
  }
}

export const NEW_PROBLEM = 'NEW_PROBLEM'
export function newProblem () {
  return (dispatch, getState) => {
    dispatch(createAction(NEW_PROBLEM)(generateRandomProblem(getState().configuration)))
  }
}

export const START_CHALLENGE = 'START_CHALLENGE'
export function startChallenge () {
  return (dispatch, getState) => {
    dispatch(newProblem())
    dispatch(createAction(START_CHALLENGE)())
  }
}

export const QUIT_CHALLENGE = 'QUIT_CHALLENGE'
export const quitChallenge = createAction(QUIT_CHALLENGE)

export const CHANGE_OPERAND = 'CHANGE_OPERAND'
export const changeOperand = createAction(CHANGE_OPERAND,
  (operandIndex, operandValue) => ({operandIndex, operandValue}))

export const CHANGE_OPERATOR = 'CHANGE_OPERATOR'
export const changeOperator = createAction(CHANGE_OPERATOR)

export const TOGGLE_SHOW_ANSWER = 'TOGGLE_SHOW_ANSWER'
export const toggleShowAnswer = createAction(TOGGLE_SHOW_ANSWER)

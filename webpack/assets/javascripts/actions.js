import {createAction} from 'redux-actions'

export const START_CHALLENGE = 'START_CHALLENGE'
export const startChallenge = createAction(START_CHALLENGE)

export const QUIT_CHALLENGE = 'QUIT_CHALLENGE'
export const quitChallenge = createAction(QUIT_CHALLENGE)

export const CHANGE_OPERAND = 'CHANGE_OPERAND'
export const changeOperand = createAction(CHANGE_OPERAND,
  (operandIndex, operandValue) => ({operandIndex, operandValue}))

export const CHANGE_OPERATOR = 'CHANGE_OPERATOR'
export const changeOperator = createAction(CHANGE_OPERATOR)

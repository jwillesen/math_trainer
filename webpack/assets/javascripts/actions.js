import {createAction} from 'redux-actions'
import Chance from 'chance'
import deepEqual from 'deep-equal'
import {OPERATORS} from './constants'

const stdrng = new Chance()

function selectRandomOperator (operators, rng) {
  const enabledOperators = Object.keys(operators).reduce((memo, operator) => {
    if (operators[operator]) memo.push(operator)
    return memo
  }, [])
  if (enabledOperators.length === 0) return OPERATORS.plus

  // short-circuit length 1 so unit tests don't have to fake these random numbers
  if (enabledOperators.length === 1) return enabledOperators[0]

  const selectedIndex = rng.integer({min: 0, max: enabledOperators.length - 1})
  return enabledOperators[selectedIndex]
}

export function generateRandomProblem (configuration, priorProblem, rng = stdrng) {
  const problemGenerators = {
    [OPERATORS.plus]: generateAdditionProblem,
    [OPERATORS.minus]: generateSubtractionProblem,
    [OPERATORS.times]: generateMultiplicationProblem,
  }

  const selectedOperator = selectRandomOperator(configuration.operators, rng)
  const problemGenerator = problemGenerators[selectedOperator]

  let newProblem = problemGenerator(configuration, rng)
  // avoid displaying the same problem twice
  for (let i = 0; i < 5 && deepEqual(newProblem, priorProblem); ++i) {
    newProblem = problemGenerator(configuration, rng)
  }

  return newProblem
}

function generateOperands (configuration, rng) {
  return [
    rng.integer({min: 1, max: configuration.operands[0]}),
    rng.integer({min: 1, max: configuration.operands[1]}),
  ]
}

function makeProblemState (operands, operator, answer) {
  return {operands, operator, answer}
}

export function generateAdditionProblem (configuration, rng) {
  const operands = generateOperands(configuration, rng)
  return makeProblemState(
    operands, OPERATORS.plus,
    operands.reduce((memo, next) => memo + next)
  )
}

export function generateSubtractionProblem (configuration, rng) {
  const operands = generateOperands(configuration, rng)
  if (operands[0] < operands[1]) operands.reverse()
  return makeProblemState(
    operands, OPERATORS.minus,
    operands.reduce((memo, next) => memo - next)
  )
}

export function generateMultiplicationProblem (configuration, rng) {
  const operands = generateOperands(configuration, rng)
  return makeProblemState(
    operands, OPERATORS.times,
    operands.reduce((memo, next) => memo * next)
  )
}

export const NEW_PROBLEM = 'NEW_PROBLEM'
export function newProblem () {
  return (dispatch, getState) => {
    const state = getState()
    dispatch(createAction(NEW_PROBLEM)(
      generateRandomProblem(state.configuration, state.game.problem))
    )
  }
}

export const START_GAME = 'START_GAME'
export function startGame () {
  return (dispatch, getState) => {
    const gameMode = getState().configuration.gameMode
    dispatch(newProblem())
    dispatch(createAction(START_GAME)(gameMode))
  }
}

export const QUIT_GAME = 'QUIT_GAME'
export const quitGame = createAction(QUIT_GAME)

export const CHANGE_OPERAND = 'CHANGE_OPERAND'
export const changeOperand = createAction(CHANGE_OPERAND,
  (operandIndex, operandValue) => ({operandIndex, operandValue}))

export const TOGGLE_OPERATOR = 'TOGGLE_OPERATOR'
export const toggleOperator = createAction(TOGGLE_OPERATOR)

export const TOGGLE_SHOW_ANSWER = 'TOGGLE_SHOW_ANSWER'
export const toggleShowAnswer = createAction(TOGGLE_SHOW_ANSWER)

export const CHANGE_GAME_MODE = 'CHANGE_GAME_MODE'
export const changeGameMode = createAction(CHANGE_GAME_MODE)

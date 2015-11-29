/* eslint-env mocha */

import expect from 'expect'
import {FINISHED, OPERATORS} from 'constants'
import * as actions from 'actions'
import reducer, {configurationReducers} from 'reducer'

const defaultState = () => {
  return reducer(undefined, {type: '~~~blah~~~'})
}

describe('configuration.operands', () => {
  const defaultOperators = configurationReducers.operators(undefined, {type: 'test-init'})

  it('toggleOperator toggles the operator value to false', () => {
    expect(defaultOperators[OPERATORS.plus]).toExist()
    const nextOperands = configurationReducers.operators(defaultOperators, actions.toggleOperator(OPERATORS.plus))
    expect(nextOperands[OPERATORS.plus]).toNotExist()
  })

  it('toggleOperator toggles the operator value to true', () => {
    expect(defaultOperators[OPERATORS.minus]).toNotExist()
    const nextOperands = configurationReducers.operators(defaultOperators, actions.toggleOperator(OPERATORS.minus))
    expect(nextOperands[OPERATORS.minus]).toExist()
  })
})

const guessProblemState = (guess = '') => {
  const state = defaultState()
  state.game.challenge.guess = guess
  return state
}

describe('challenge reducers', () => {
  it('resets guess on new problem', () => {
    const state = guessProblemState('42')
    const nextState = reducer(state, actions.rawNewProblem(state.game.problem))
    expect(nextState.game.challenge.guess).toBe('')
  })

  it('resets finished on new problem', () => {
    const state = guessProblemState('42')
    state.game.challenge.finished = FINISHED.correct
    const nextState = reducer(state, actions.rawNewProblem(state.game.problem))
    expect(nextState.game.challenge.finished).toBe(FINISHED.unfinished)
  })
})

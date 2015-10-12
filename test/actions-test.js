/* eslint-env mocha */

import expect from 'expect'
import {MODES, OPERATORS} from 'constants'
import * as actions from 'actions'
import reducer from 'reducer'
const startGame = actions.startGame
const generateRandomProblem = actions.generateRandomProblem

const defaultState = reducer(undefined, {type: 'blah'})

function fakeRng (...numbers) {
  const numberGenerator = function * () {
    for (let number of numbers) {
      yield number
    }
  }
  const gen = numberGenerator()
  return {integer: () => gen.next().value}
}

describe('startGame', () => {
  it('creates a new problem and sets mode to configured game mode', () => {
    const dispatch = expect.createSpy()
    const getState = () => defaultState
    startGame()(dispatch, getState)
    expect(dispatch.calls.length).toBe(2)
    const actionFunction = dispatch.calls[0].arguments[0]
    actionFunction(dispatch, getState)
    expect(dispatch.calls.length).toBe(3)
    expect(typeof actionFunction).toBe('function')
    expect(dispatch.calls[1].arguments[0]).toEqual({type: actions.START_GAME, payload: MODES.flashcard})
    expect(dispatch.calls[2].arguments[0].type).toBe(actions.NEW_PROBLEM)
  })
})

describe('generateRandomProblem', () => {
  it('generates operands in the desired range', () => {
    const spyRng = {integer () {}}
    const spy = expect.spyOn(spyRng, 'integer').andReturn(1)
    const result = generateRandomProblem({operands: [3, 4], operators: {[OPERATORS.plus]: true}}, {}, spyRng)
    expect(spy.calls.length).toBe(2)
    expect(spy.calls[0].arguments).toEqual([{min: 1, max: 3}])
    expect(spy.calls[1].arguments).toEqual([{min: 1, max: 4}])
    expect(result.operands).toEqual([1, 1])
  })

  it('copies the operator', () => {
    const result = generateRandomProblem({operands: [3, 4], operators: {[OPERATORS.plus]: true}}, {})
    expect(result.operator).toBe(OPERATORS.plus)
  })

  it('generates the answer to a plus operator', () => {
    const result = generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.plus]: true}}, {}, fakeRng(1, 2))
    expect(result.answer).toBe(3)
  })

  it('generates the answer to a minus operator', () => {
    const result = generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.minus]: true}}, {}, fakeRng(2, 1))
    expect(result.answer).toBe(1)
    expect(result.operator).toBe(OPERATORS.minus)
  })

  it('reverses operands if answer would be negative', () => {
    const result = generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.minus]: true}}, {}, fakeRng(2, 3))
    expect(result.operands).toEqual([3, 2])
    expect(result.answer).toBe(1)
  })

  it('generates the answer to a times operator', () => {
    const result = generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.times]: true}}, {}, fakeRng(3, 4))
    expect(result.answer).toBe(12)
    expect(result.operator).toBe(OPERATORS.times)
  })

  it('avoids generating the same problem twice', () => {
    const result = generateRandomProblem(
      {operands: [5, 5], operators: {[OPERATORS.plus]: true}},
      {operands: [1, 2], operator: OPERATORS.plus, answer: 3},
      fakeRng(1, 2, 1, 2, 1, 2, 3, 4)
    )
    expect(result.operands).toEqual([3, 4])
    expect(result.answer).toEqual(7)
  })

  it('does not have an infinte loop avoiding duplicate problems', () => {
    const result = generateRandomProblem(
      {operands: [5, 5], operators: {[OPERATORS.plus]: true}},
      {operands: [1, 2], operator: OPERATORS.plus, answer: 3},
      fakeRng(
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
        1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2)
    )
    expect(result.operands).toEqual([1, 2])
    expect(result.answer).toEqual(3)
  })

  it('selects from a set of operators', () => {
    const result = generateRandomProblem({
      operands: [5, 5],
      operators: {[OPERATORS.plus]: false, [OPERATORS.minus]: true, [OPERATORS.times]: true},
    }, {}, fakeRng(1, 2, 2))
    // can't predict order of object keys, either is valid
    expect([OPERATORS.minus, OPERATORS.times]).toInclude(result.operator)
  })

  it('uses plus if no operators are selected', () => {
    const result = generateRandomProblem({
      operands: [5, 5],
      operators: {[OPERATORS.plus]: false, [OPERATORS.minus]: false, [OPERATORS.times]: false},
    }, {}, fakeRng(1, 2))
    expect(result.operator).toBe(OPERATORS.plus)
  })
})

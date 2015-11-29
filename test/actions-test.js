/* eslint-env mocha */

import expect from 'expect'
import {MODES, OPERATORS, FINISHED} from 'constants'
import * as actions from 'actions'
import reducer from 'reducer'
import Harness from './action-dispatch-harness'

const defaultState = () => reducer(undefined, {type: 'blah'})

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
    const harness = new Harness(defaultState())
    harness.dispatch(actions.startGame())
    expect(harness.spy.calls.length).toBe(2)
    expect(harness.spy).toHaveBeenCalledWith({type: actions.START_GAME, payload: MODES.flashcard})
    expect(harness.spy.calls.map((call) => call.arguments[0].type)).toInclude(actions.NEW_PROBLEM)
  })
})

describe('generateRandomProblem', () => {
  it('generates operands in the desired range', () => {
    const spyRng = {integer () {}}
    const spy = expect.spyOn(spyRng, 'integer').andReturn(1)
    const result = actions.generateRandomProblem({operands: [3, 4], operators: {[OPERATORS.plus]: true}}, {}, spyRng)
    expect(spy.calls.length).toBe(2)
    expect(spy).toHaveBeenCalledWith({min: 1, max: 3})
    expect(spy).toHaveBeenCalledWith({min: 1, max: 4})
    expect(result.operands).toEqual([1, 1])
  })

  it('copies the operator', () => {
    const result = actions.generateRandomProblem({operands: [3, 4], operators: {[OPERATORS.plus]: true}}, {})
    expect(result.operator).toBe(OPERATORS.plus)
  })

  it('generates the answer to a plus operator', () => {
    const result = actions.generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.plus]: true}}, {}, fakeRng(1, 2))
    expect(result.answer).toBe(3)
  })

  it('generates the answer to a minus operator', () => {
    const result = actions.generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.minus]: true}}, {}, fakeRng(2, 1))
    expect(result.answer).toBe(1)
    expect(result.operator).toBe(OPERATORS.minus)
  })

  it('reverses operands if answer would be negative', () => {
    const result = actions.generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.minus]: true}}, {}, fakeRng(2, 3))
    expect(result.operands).toEqual([3, 2])
    expect(result.answer).toBe(1)
  })

  it('generates the answer to a times operator', () => {
    const result = actions.generateRandomProblem({operands: [5, 5], operators: {[OPERATORS.times]: true}}, {}, fakeRng(3, 4))
    expect(result.answer).toBe(12)
    expect(result.operator).toBe(OPERATORS.times)
  })

  it('avoids generating the same problem twice', () => {
    const result = actions.generateRandomProblem(
      {operands: [5, 5], operators: {[OPERATORS.plus]: true}},
      {operands: [1, 2], operator: OPERATORS.plus, answer: 3},
      fakeRng(1, 2, 1, 2, 1, 2, 3, 4)
    )
    expect(result.operands).toEqual([3, 4])
    expect(result.answer).toEqual(7)
  })

  it('does not have an infinte loop avoiding duplicate problems', () => {
    const result = actions.generateRandomProblem(
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
    const result = actions.generateRandomProblem({
      operands: [5, 5],
      operators: {[OPERATORS.plus]: false, [OPERATORS.minus]: true, [OPERATORS.times]: true},
    }, {}, fakeRng(1, 2, 2))
    // can't predict order of object keys, either is valid
    expect([OPERATORS.minus, OPERATORS.times]).toInclude(result.operator)
  })

  it('uses plus if no operators are selected', () => {
    const result = actions.generateRandomProblem({
      operands: [5, 5],
      operators: {[OPERATORS.plus]: false, [OPERATORS.minus]: false, [OPERATORS.times]: false},
    }, {}, fakeRng(1, 2))
    expect(result.operator).toBe(OPERATORS.plus)
  })
})

const getProblemState = (currentGuess = '') => {
  const result = defaultState()
  result.configuration.gameMode = MODES.challenge
  result.game.problem = {
    operands: [1, 1],
    operator: OPERATORS.plus,
    answer: 12345,
  }
  result.game.challenge.guess = currentGuess
  return result
}

describe('challengeKeyPress', () => {
  it('appends digits', () => {
    const harness = new Harness(getProblemState('1'))
    harness.dispatch(actions.challengeKeyPress('2'))
    expect(harness.spy).toHaveBeenCalledWith({type: actions.SET_GUESS, payload: '12'})
    expect(harness.spy.calls.length).toBe(1)
  })

  it('ignores digits when mode is not challenge', () => {
    const state = getProblemState()
    state.configuration.gameMode = MODES.flashcard
    const harness = new Harness(state)
    harness.dispatch(actions.challengeKeyPress('1'))
    expect(harness.spy).toNotHaveBeenCalled()
  })

  it('ignores non-digits', () => {
    const harness = new Harness(getProblemState())
    harness.dispatch(actions.challengeKeyPress('Tab'))
    expect(harness.spy).toNotHaveBeenCalled()
  })

  it('clears on escape', () => {
    const harness = new Harness(getProblemState('1234'))
    harness.dispatch(actions.challengeKeyPress('Escape'))
    expect(harness.spy).toHaveBeenCalledWith({type: actions.SET_GUESS, payload: ''})
    expect(harness.spy.calls.length).toBe(1)
  })

  it('removes last digit on backspace', () => {
    const harness = new Harness(getProblemState('1234'))
    harness.dispatch(actions.challengeKeyPress('Backspace'))
    expect(harness.spy).toHaveBeenCalledWith({type: actions.SET_GUESS, payload: '123'})
    expect(harness.spy.calls.length).toBe(1)
  })

  it('auto-detects correct answer', () => {
    const harness = new Harness(getProblemState('1234'))
    harness.dispatch(actions.challengeKeyPress('5'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setGuess('12345'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setFinished(FINISHED.correct))
    expect(harness.spy.calls.length).toBe(2)
  })

  it('auto-detects wrong answer', () => {
    const harness = new Harness(getProblemState('1234'))
    harness.dispatch(actions.challengeKeyPress('9'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setGuess('12349'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setFinished(FINISHED.incorrect))
    expect(harness.spy.calls.length).toBe(2)
  })

  it('accepts enter to submit current guess', () => {
    const harness = new Harness(getProblemState(''))
    harness.dispatch(actions.challengeKeyPress('Enter'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setFinished(FINISHED.incorrect))
    expect(harness.spy.calls.length).toBeLessThan(3) // ok if guess is set again
  })

  it('accepts space to submit current guess', () => {
    const harness = new Harness(getProblemState(''))
    harness.dispatch(actions.challengeKeyPress('Spacebar'))
    expect(harness.spy).toHaveBeenCalledWith(actions.setFinished(FINISHED.incorrect))
    expect(harness.spy.calls.length).toBeLessThan(3) // ok if guess is set again
  })
})

/* eslint-env mocha */

import expect from 'expect'
import {OPERATORS} from 'constants'
import {generateRandomProblem} from 'actions'

describe('generateRandomProblem', () => {
  it('generates operands in the desired range', () => {
    const fakeRng = {integer () {}}
    const spy = expect.spyOn(fakeRng, 'integer').andReturn(1)
    const result = generateRandomProblem({operands: [3, 4], operator: OPERATORS.plus}, fakeRng)
    expect(spy.calls.length).toBe(2)
    expect(spy.calls[0].arguments).toEqual([{min: 1, max: 3}])
    expect(spy.calls[1].arguments).toEqual([{min: 1, max: 4}])
    expect(result.operands).toEqual([1, 1])
  })

  it('copies the operator', () => {
    const result = generateRandomProblem({operands: [3, 4], operator: OPERATORS.plus})
    expect(result.operator).toBe(OPERATORS.plus)
  })

  it('generates the answer to a plus operator', () => {
    const numbers = (function * () {
      yield 1
      yield 2
    }())
    const fakeRng = {integer: () => numbers.next().value}
    const result = generateRandomProblem({operands: [5, 5], operator: OPERATORS.plus}, fakeRng)
    expect(result.answer).toBe(3)
  })

  it('generates the answer to a minus operator')
  it('does not generate a negative answer')
  it('generates the answer to a times operator')
})

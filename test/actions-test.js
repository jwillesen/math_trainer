/* eslint-env mocha */

import expect from 'expect'
import {OPERATORS} from 'constants'
import {generateRandomProblem} from 'actions'

function fakeRng (...numbers) {
  const numberGenerator = function * () {
    for (let number of numbers) {
      yield number
    }
  }
  const gen = numberGenerator()
  return {integer: () => gen.next().value}
}

describe('generateRandomProblem', () => {
  it('generates operands in the desired range', () => {
    const spyRng = {integer () {}}
    const spy = expect.spyOn(spyRng, 'integer').andReturn(1)
    const result = generateRandomProblem({operands: [3, 4], operator: OPERATORS.plus}, spyRng)
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
    const result = generateRandomProblem({operands: [5, 5], operator: OPERATORS.plus}, fakeRng(1, 2))
    expect(result.answer).toBe(3)
  })

  it('generates the answer to a minus operator', () => {
    const result = generateRandomProblem({operands: [5, 5], operator: OPERATORS.minus}, fakeRng(2, 1))
    expect(result.answer).toBe(1)
    expect(result.operator).toBe(OPERATORS.minus)
  })

  it('reverses operands if answer would be negative', () => {
    const result = generateRandomProblem({operands: [5, 5], operator: OPERATORS.minus}, fakeRng(2, 3))
    expect(result.operands).toEqual([3, 2])
    expect(result.answer).toBe(1)
  })

  it('generates the answer to a times operator', () => {
    const result = generateRandomProblem({operands: [5, 5], operator: OPERATORS.times}, fakeRng(3, 4))
    expect(result.answer).toBe(12)
    expect(result.operator).toBe(OPERATORS.times)
  })
})

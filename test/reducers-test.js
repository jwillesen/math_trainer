/* eslint-env mocha */

import expect from 'expect'
import {OPERATORS} from 'constants'
import * as actions from 'actions'
import {configurationReducers} from 'reducer'

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

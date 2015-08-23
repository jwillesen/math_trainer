/* eslint-env mocha */

import expect from 'expect'
import {changeOperand} from 'actions'

describe('changeOperand', () => {
  it('has index and value in payload', () => {
    const action = changeOperand(1, 2)
    expect(action.payload).toEqual({operandIndex: 1, operandValue: 2})
  })
})

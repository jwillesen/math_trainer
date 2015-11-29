/* eslint-env mocha */

import expect from 'expect'

import Harness from './action-dispatch-harness'

describe('action-dispatch-harness', () => {
  it('calls the spy with a normal action', () => {
    const harness = new Harness()
    const action = {type: 'foo', payload: 'bar'}
    const result = harness.dispatch(action)
    expect(result).toEqual(action)
    expect(harness.spy).toHaveBeenCalledWith(action)
  })

  it('calls functions like redux-thunk', () => {
    const state = {foo: 'bar'}
    const action = {type: 'baz'}
    const harness = new Harness(state)
    const thunk = expect.createSpy().andCall(
      (dispatch, getState) => {
        expect(getState()).toEqual(state)
        dispatch(action)
        return 1234
      }
    )

    const result = harness.dispatch(thunk)
    expect(result).toBe(1234)
    expect(thunk).toHaveBeenCalled()
    expect(thunk.calls[0].arguments.length).toBe(2)
    expect(harness.spy).toHaveBeenCalledWith(action)
  })

  it('passes valid dispatch function', () => {
    const action = {type: 'bar'}
    const harness = new Harness()
    const innerThunk = expect.createSpy().andCall(
      (dispatch, getState) => {
        dispatch(action)
        return 1234
      }
    )
    const outerThunk = expect.createSpy().andCall(
      (dispatch, getState) => {
        dispatch(innerThunk)
        return 5678
      }
    )
    const result = harness.dispatch(outerThunk)
    expect(result).toBe(5678)
    expect(outerThunk).toHaveBeenCalled()
    expect(innerThunk).toHaveBeenCalled()
    expect(harness.spy).toHaveBeenCalledWith(action)
  })
})

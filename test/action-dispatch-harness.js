import expect from 'expect'

// Hmm... would it be better to implement this with redux itself?
// reducer would be a noop

export default class ActionDispatchHarness {
  constructor (state = {}) {
    this.state = state
    this.spy = expect.createSpy()
  }

  dispatchSpy () { return this.spy }
  getState () { return this.state }

  dispatch (action) {
    if (typeof action === 'function') {
      return action(this.dispatch.bind(this), this.getState.bind(this))
    } else if (typeof action === 'object') {
      this.spy(action)
      return action
    }
  }
}

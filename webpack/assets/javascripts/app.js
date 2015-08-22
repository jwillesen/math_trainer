import React from 'react'
import {connect} from 'react-redux'
import {startChallenge, quitChallenge} from './actions'
import modes from './modes'
import Configuration from 'views/configuration'
import Challenge from 'views/challenge'

export class App extends React.Component {
  render () {
    const mode = this.props.state.mode
    let screen = null
    if (mode === modes.CONFIGURE) {
      screen = <Configuration startChallenge={this.props.startChallenge} />
    } else if (mode === modes.CHALLENGE) {
      screen = <Challenge quitChallenge={this.props.quitChallenge} />
    } else {
      screen = <h1>Error, Unknown Mode</h1>
    }

    return (
      <div className="container">
        {screen}
      </div>
    )
  }
}

const boundActions = {startChallenge, quitChallenge}

export const ConnectedApp = connect(
  state => ({state}), boundActions)(App)
export default ConnectedApp

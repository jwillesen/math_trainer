import React from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import {MODES} from './constants'
import Configuration from 'views/configuration'
import Challenge from 'views/challenge'

export class App extends React.Component {
  render () {
    const mode = this.props.state.mode
    let screen = null
    if (mode === MODES.configure) {
      screen = <Configuration
        configuration={this.props.state.configuration}
        changeOperand={this.props.changeOperand}
        changeOperator={this.props.changeOperator}
        startChallenge={this.props.startChallenge}
      />
    } else if (mode === MODES.challenge) {
      screen = <Challenge
        challenge={this.props.state.challenge}
        quitChallenge={this.props.quitChallenge}
      />
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

export const ConnectedApp = connect(
  state => ({state}), actions)(App)
export default ConnectedApp

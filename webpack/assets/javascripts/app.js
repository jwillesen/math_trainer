import React from 'react'
import {connect} from 'react-redux'
import * as actions from './actions'
import {MODES} from './constants'
import Configuration from 'views/configuration'
import Flashcard from 'views/flashcard'
import Challenge from 'views/challenge'

export class App extends React.Component {
  render () {
    const mode = this.props.state.mode
    let screen = null
    if (mode === MODES.configure) {
      screen = <Configuration
        configuration={this.props.state.configuration}
        changeOperand={this.props.changeOperand}
        toggleOperator={this.props.toggleOperator}
        startGame={this.props.startGame}
        changeGameMode={this.props.changeGameMode}
      />
    } else if (mode === MODES.flashcard) {
      screen = <Flashcard
        game={this.props.state.game}
        toggleShowAnswer={this.props.toggleShowAnswer}
        newProblem={this.props.newProblem}
        updateDuration={this.props.updateDuration}
        quitGame={this.props.quitGame}
      />
    } else if (mode === MODES.challenge) {
      screen = <Challenge
        game={this.props.state.game}
        quitGame={this.props.quitGame}
        newProblem={this.props.newProblem}
        challengeKeyPress={this.props.challengeKeyPress}
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

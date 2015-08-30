require('challenge.scss')

import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import ProblemDisplay from './problem_display'

export default class Challenge extends React.Component
{
  static get propTypes () {
    return {
      challenge: PropTypes.object.isRequired,
      toggleShowAnswer: PropTypes.func.isRequired,
      newProblem: PropTypes.func.isRequired,
      quitChallenge: PropTypes.func.isRequired,
    }
  }

  continueButtonProps () {
    return this.props.challenge.showAnswer ?
      {text: 'Next Problem', action: this.props.newProblem} :
      {text: 'Show Answer', action: this.props.toggleShowAnswer}
  }

  render () {
    const continueProps = this.continueButtonProps()
    return (
      <div>
        <h1>Game On!</h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitChallenge}>Quit</Button>
          <Button onClick={continueProps.action}>{continueProps.text}</Button>
        </ButtonToolbar>
        <ProblemDisplay
          problem={this.props.challenge.problem}
          showAnswer={this.props.challenge.showAnswer}
        />
      </div>
    )
  }
}


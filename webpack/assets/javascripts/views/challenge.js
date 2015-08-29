require('challenge.scss')

import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import ProblemDisplay from './problem_display'

export default class Challenge extends React.Component
{
  static get propTypes () {
    return {
      challenge: PropTypes.object.isRequired,
      newProblem: PropTypes.func.isRequired,
      quitChallenge: PropTypes.func.isRequired,
    }
  }

  render () {
    return (
      <div>
        <h1>Game On!</h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitChallenge}>Quit</Button>
          <Button onClick={this.props.newProblem}>New Problem</Button>
        </ButtonToolbar>
        <ProblemDisplay problem={this.props.challenge.problem} />
      </div>
    )
  }
}


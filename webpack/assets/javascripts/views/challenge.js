require('challenge.scss')

import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap'
import ProblemDisplay from './problem_display'

export default class Challenge extends React.Component
{
  static get propTypes () {
    return {
      quitChallenge: PropTypes.func.isRequired,
      challenge: PropTypes.object.isRequired,
    }
  }

  render () {
    return (
      <div>
        <h1>Game On!</h1>
        <Button bsStyle='primary' onClick={this.props.quitChallenge}>Quit</Button>
        <ProblemDisplay problem={this.props.challenge.problem} />
      </div>
    )
  }
}


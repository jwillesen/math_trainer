import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import TimerSpan from './timer_span'

export default class Challenge extends React.Component {
  static get propTypes () {
    return {
      game: PropTypes.object.isRequired,
      newProblem: PropTypes.func.isRequired,
      quitGame: PropTypes.func.isRequired,
      timerIntervalMs: PropTypes.number,
    }
  }

  static get defaultProps () {
    return {
      timerIntervalMs: 500,
    }
  }

  render () {
    return (
      <div>
        <h1>Challenge Mode!<TimerSpan className='pull-right' start={this.props.game.time.start}/></h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitGame}>Quit</Button>
        </ButtonToolbar>
        <p>Sorry, this mode hasn't been implemented yet</p>
      </div>
    )
  }
}

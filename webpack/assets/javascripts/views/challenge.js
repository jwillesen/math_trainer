import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import ProblemDisplay from './problem_display'
import TimerSpan from './timer_span'
import {FINISHED} from 'constants'

const keyCodeMap = {
  8: 'Backspace',
  27: 'Escape',
  13: 'Enter',
  32: 'Spacebar',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  // keypad codes
  96: '0',
  97: '1',
  98: '2',
  99: '3',
  100: '4',
  101: '5',
  102: '6',
  103: '7',
  104: '8',
  105: '9',
}

export default class Challenge extends React.Component {
  static get propTypes () {
    return {
      // required
      game: PropTypes.object.isRequired,
      newProblem: PropTypes.func.isRequired,
      quitGame: PropTypes.func.isRequired,
      challengeKeyPress: PropTypes.func.isRequired,

      // optional
      finishedTimeoutMillis: PropTypes.number, // in millis
    }
  }

  static get defaultProps () {
    return {
      finishedTimeoutMillis: 1000,
    }
  }

  componentDidMount () {
    this.keyListener = this.handleKey.bind(this)
    document.addEventListener('keydown', this.keyListener)
    this.checkFinishedTimer()
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.keyListener)
    this.keyListener = null
    this.cancelFinishedTimer()
  }

  componentDidUpdate () {
    this.checkFinishedTimer()
  }

  handleKey (event) {
    if (this.props.game.challenge.finished === FINISHED.unfinished) {
      const keyname = keyCodeMap[event.keyCode]
      if (keyname) {
        event.preventDefault()
        this.props.challengeKeyPress(keyname)
      }
    }
  }

  checkFinishedTimer () {
    if (this.props.game.challenge.finished === FINISHED.unfinished) {
      this.cancelFinishedTimer()
    } else {
      this.startFinishedTimer()
    }
  }

  cancelFinishedTimer () {
    if (this.finishedTimer) {
      window.clearTimeout(this.finishedTimer)
      this.finishedTimer = null
    }
  }

  startFinishedTimer () {
    if (!this.finishedTimer) {
      this.finishedTimer = window.setTimeout(() => this.finishedTimeout(), this.props.finishedTimeoutMillis)
    }
  }

  finishedTimeout () {
    this.finishedTimer = null
    this.props.newProblem()
  }

  render () {
    return (
      <div>
        <h1>Challenge Mode!<TimerSpan className='pull-right' start={this.props.game.time.start}/></h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitGame}>Quit</Button>
        </ButtonToolbar>
        <ProblemDisplay
          topOperand={this.props.game.problem.operands[0]}
          bottomOperand={this.props.game.problem.operands[1]}
          operator={this.props.game.problem.operator}
          answer={this.props.game.challenge.guess}
          answerClassNames={{
            visible: true,
            correct: this.props.game.challenge.finished === FINISHED.correct,
            incorrect: this.props.game.challenge.finished === FINISHED.incorrect,
          }}
        />
      </div>
    )
  }
}

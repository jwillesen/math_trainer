import React, {PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Button, ButtonToolbar} from 'react-bootstrap'
import ProblemDisplay from './problem_display'
import TimerSpan from './timer_span'

export default class Flashcard extends React.Component {
  static get propTypes () {
    return {
      game: PropTypes.object.isRequired,
      toggleShowAnswer: PropTypes.func.isRequired,
      newProblem: PropTypes.func.isRequired,
      quitGame: PropTypes.func.isRequired,
    }
  }

  componentDidMount () {
    ReactDOM.findDOMNode(this.refs.continueButton).focus()
  }

  continueButtonProps () {
    return this.props.game.showAnswer
      ? {text: 'Next Problem', action: this.props.newProblem}
      : {text: 'Show Answer', action: this.props.toggleShowAnswer}
  }

  render () {
    const continueProps = this.continueButtonProps()
    return (
      <div>
        <h1>Flash Cards<TimerSpan className='pull-right' /></h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitGame}>Quit</Button>
          <Button ref='continueButton' onClick={continueProps.action}>{continueProps.text}</Button>
        </ButtonToolbar>
        <ProblemDisplay
          problem={this.props.game.problem}
          showAnswer={this.props.game.showAnswer}
        />
      </div>
    )
  }
}


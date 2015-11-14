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
        <h1>Flash Cards<TimerSpan className='pull-right' start={this.props.game.time.start} /></h1>
        <ButtonToolbar>
          <Button bsStyle='primary' onClick={this.props.quitGame}>Quit</Button>
          <Button ref='continueButton' onClick={continueProps.action}>{continueProps.text}</Button>
        </ButtonToolbar>
        <ProblemDisplay
          topOperand={this.props.game.problem.operands[0]}
          bottomOperand={this.props.game.problem.operands[1]}
          operator={this.props.game.problem.operator}
          answer={this.props.game.problem.answer}
          showAnswer={this.props.game.showAnswer}
        />
      </div>
    )
  }
}


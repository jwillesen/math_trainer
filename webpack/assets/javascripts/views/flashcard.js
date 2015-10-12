import React, {PropTypes} from 'react'
import {Button, ButtonToolbar} from 'react-bootstrap'
import ProblemDisplay from './problem_display'

export default class Flashcard extends React.Component
{
  static get propTypes () {
    return {
      game: PropTypes.object.isRequired,
      toggleShowAnswer: PropTypes.func.isRequired,
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

  componentWillMount () {
    this.updateDuration()
    this.interval = setInterval(() => this.updateDuration(), this.props.timerIntervalMs)
  }

  componentDidMount () {
    React.findDOMNode(this.refs.continueButton).focus()
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  continueButtonProps () {
    return this.props.game.showAnswer
      ? {text: 'Next Problem', action: this.props.newProblem}
      : {text: 'Show Answer', action: this.props.toggleShowAnswer}
  }

  updateDuration () {
    this.setState({duration: Date.now() - this.props.game.time.start})
  }

  durationString () {
    const durationIsoString = new Date(this.state.duration).toISOString()
    return durationIsoString.slice(-13, -5)
  }

  render () {
    const continueProps = this.continueButtonProps()
    return (
      <div>
        <h1>Flash Cards<span className='pull-right'>{this.durationString()}</span></h1>
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


import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {OPERATORS} from '../constants'

require('problem.scss')

export default class ProblemDisplay extends React.Component {
  static get propTypes () {
    return {
      showAnswer: PropTypes.bool,
      problem: PropTypes.object.isRequired,
    }
  }

  static get defaultProps () {
    return {
      showAnswer: false,
    }
  }

  operatorText () {
    switch (this.props.problem.operator) {
      case OPERATORS.plus: return '\u002B' // plus sign
      case OPERATORS.minus: return '\u2212' // minus sign
      case OPERATORS.times: return '\u00D7' // multiplication sign
      case OPERATORS.divide: return '\u00F7' // division sign
      default: return '?'
    }
  }

  render () {
    return (
      <div className='problem'>
        <div className='operators'>
          <div className='operator'>{this.operatorText()}</div>
        </div>
        <div className='numbers'>
          <span className='operand'>{this.props.problem.operands[0]}</span>
          <span className='operand'>{this.props.problem.operands[1]}</span>
          <span className='answer-line'></span>
          <span className={classNames('answer', {visible: this.props.showAnswer})}>
            {this.props.problem.answer}
          </span>
        </div>
      </div>
    )
  }
}

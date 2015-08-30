import React, {PropTypes} from 'react'
import classNames from 'classnames'

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

  render () {
    return (
      <div className='problem'>
        <div className='operators'>
          <div className='operator'>{this.props.problem.operator}</div>
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

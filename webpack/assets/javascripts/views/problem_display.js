import React, {PropTypes} from 'react'

export default class ProblemDisplay extends React.Component {
  static get propTypes () {
    return {
      problem: PropTypes.object.isRequired,
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
          <span className='answer'>{this.props.problem.answer}</span>
        </div>
      </div>
    )
  }
}

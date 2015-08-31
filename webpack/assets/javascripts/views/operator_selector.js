import React, {PropTypes} from 'react'
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import {OPERATORS} from '../constants'

export default class OperandSelector extends React.Component {
  static get propTypes () {
    return {
      operators: PropTypes.object.isRequired,
      toggleOperator: PropTypes.func.isRequired,
    }
  }

  handleButtonClick (operandValue, event) {
    this.props.operandChange(operandValue)
  }

  operatorButtonProps (operator) {
    const enabled = this.props.operators[operator]
    if (enabled) return {active: true, 'aria-pressed': 'true'}
    else return {active: false, 'aria-pressed': 'false'}
  }

  renderButton (glyph, operator) {
    return (
      <Button
        onClick={this.props.toggleOperator.bind(null, operator)}
        {...this.operatorButtonProps(operator)}
      >
        <Glyphicon glyph={glyph} />
      </Button>
    )
  }

  renderWarning () {
    if (Object.values(this.props.operators).every(value => value === false)) {
      return (<span className='alert text-warning bg-warning'>
        <Glyphicon glyph='warning-sign' /> You should select at least one operator
      </span>)
    }
    return null
  }

  render () {
    return (
      <div className='select-operator'>
        <ButtonGroup bsSize='large'>
          {this.renderButton('plus', OPERATORS.plus)}
          {this.renderButton('minus', OPERATORS.minus)}
          {this.renderButton('remove', OPERATORS.times)}
        </ButtonGroup>
        {this.renderWarning()}
      </div>
    )
  }
}

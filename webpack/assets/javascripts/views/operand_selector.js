import React, {PropTypes} from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

export default class OperandSelector extends React.Component {
  static get propTypes () {
    return {
      minOperand: PropTypes.number,
      maxOperand: PropTypes.number,
      operand: PropTypes.number.isRequired,
      changeOperand: PropTypes.func.isRequired,
    }
  }

  static get defaultProps () {
    return {
      operand: 1,
      minOperand: 1,
      maxOperand: 12,
    }
  }

  handleButtonClick (operandValue, event) {
    this.props.changeOperand(operandValue)
  }

  buttonProperties (value) {
    const enabled = value === this.props.operand
    if (enabled) return {active: true, 'aria-pressed': 'true'}
    else return {active: false, 'aria-pressed': 'false'}
  }

  buttonSet () {
    const minValue = this.props.minOperand
    const maxValue = this.props.maxOperand
    const numButtons = maxValue - minValue + 1
    const buttonValues = Array.apply(null, {length: numButtons})
      .map(Number.call, Number)
      .map(value => value + minValue)
    return buttonValues.map((value) => {
      return (
        <Button key={value}
          onClick={this.handleButtonClick.bind(this, value)}
          {...this.buttonProperties(value)}
        >
          {value}
        </Button>
      )
    })
  }

  render () {
    return (
      <ButtonGroup bsSize='large'>
        {this.buttonSet()}
      </ButtonGroup>
    )
  }
}

import React, {PropTypes} from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'

export default class OperandSelector extends React.Component {
  static get propTypes () {
    return {
      minOperandValue: PropTypes.number,
      maxOperandValue: PropTypes.number,
      operandValue: PropTypes.number.isRequired,
      operandChange: PropTypes.func.isRequired,
    }
  }

  static get defaultProps () {
    return {
      operandValue: 1,
      minOperandValue: 1,
      maxOperandValue: 12,
    }
  }

  handleButtonClick (operandValue, event) {
    this.props.operandChange(operandValue)
  }

  buttonSet () {
    const minValue = this.props.minOperandValue
    const maxValue = this.props.maxOperandValue
    const numButtons = maxValue - minValue + 1
    const buttonValues = Array.apply(null, {length: numButtons})
      .map(Number.call, Number)
      .map(value => value + minValue)
    return buttonValues.map((value) => {
      const [bsActive, bsPressed] = (value === this.props.operandValue) ?
        [true, 'true'] : [false, 'false']
      return (
        <Button key={value}
          onClick={this.handleButtonClick.bind(this, value)}
          active={bsActive}
          aria-pressed={bsPressed} >
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

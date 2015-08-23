import React from 'react'
import {Button} from 'react-bootstrap'
import OperandSelector from './operand_selector'

export default class Configuration extends React.Component
{
  render () {
    return (
      <div>
        <h1>Welcome to Math Trainer</h1>
        <OperandSelector
          operandValue={this.props.configuration.operands[0]}
          operandIndex={0}
          operandChange={this.props.changeOperand}
        />
        <br/><Button bsStyle='primary' onClick={this.props.startChallenge}>Play</Button>
      </div>
    )
  }
}

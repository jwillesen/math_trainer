require('configuration.scss')

import React, {PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import OperandSelector from './operand_selector'
import OperatorSelector from './operator_selector'

export default class Configuration extends React.Component
{
  static get propTypes () {
    return {
      configuration: PropTypes.object.isRequired,
      startChallenge: PropTypes.func.isRequired,
      changeOperand: PropTypes.func.isRequired,
      toggleOperator: PropTypes.func.isRequired,
    }
  }

  render () {
    return (
      <div className='configuration'>
        <h1>Welcome to Math Trainer</h1>

        <Input label='Select Operation'><div>
          <OperatorSelector
            operators={this.props.configuration.operators}
            toggleOperator={this.props.toggleOperator}
          />
        </div></Input>

        <Input label='First Operand Limit'><div>
          <OperandSelector
            maxOperand={20}
            operand={this.props.configuration.operands[0]}
            changeOperand={this.props.changeOperand.bind(null, 0)}
          />
        </div></Input>

        <Input label='Second Operand Limit'><div>
          <OperandSelector
            maxOperand={20}
            operand={this.props.configuration.operands[1]}
            changeOperand={this.props.changeOperand.bind(null, 1)}
          />
        </div></Input>

        <div>
          <Button bsStyle='primary' onClick={this.props.startChallenge}>Play</Button>
        </div>
      </div>
    )
  }
}

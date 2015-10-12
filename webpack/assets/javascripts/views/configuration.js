require('configuration.scss')

import React, {PropTypes} from 'react'
import {Button, Input} from 'react-bootstrap'
import OperandSelector from './operand_selector'
import OperatorSelector from './operator_selector'
import {MODES} from '../constants'

export default class Configuration extends React.Component
{
  static get propTypes () {
    return {
      configuration: PropTypes.object.isRequired,
      startGame: PropTypes.func.isRequired,
      changeOperand: PropTypes.func.isRequired,
      toggleOperator: PropTypes.func.isRequired,
      changeGameMode: PropTypes.func.isRequired,
    }
  }

  onChangeGameMode () {
    this.props.changeGameMode(this.refs.gameMode.getValue())
  }

  render () {
    return (
      <div className='configuration'>
        <h1>Welcome to Math Trainer</h1>

        <Input type='select' label='Select Mode' value={this.props.configuration.gameMode}
          onChange={this.onChangeGameMode.bind(this)} ref='gameMode'>
          <option value={MODES.flashcard}>Flash Cards</option>
          <option value={MODES.challenge}>Challenge</option>
        </Input>

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
          <Button bsStyle='primary' onClick={this.props.startGame}>Play</Button>
        </div>
      </div>
    )
  }
}

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

  renderButton (operator) {
    return (
      <Button className="operator-button"
        onClick={this.props.toggleOperator.bind(null, operator)}
        {...this.operatorButtonProps(operator)}
      >
        {operator}
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
          {this.renderButton(OPERATORS.plus)}
          {this.renderButton(OPERATORS.minus)}
          {this.renderButton(OPERATORS.times)}
          {this.renderButton(OPERATORS.divide)}
        </ButtonGroup>
        {this.renderWarning()}
      </div>
    )
  }
}

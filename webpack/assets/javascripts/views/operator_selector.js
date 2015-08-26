import React, {PropTypes} from 'react'
import {Button, ButtonGroup, Glyphicon} from 'react-bootstrap'
import {OPERATORS} from '../constants'

export default class OperandSelector extends React.Component {
  static get propTypes () {
    return {
      operatorValue: PropTypes.string.isRequired,
      operatorChange: PropTypes.func.isRequired,
    }
  }

  handleButtonClick (operandValue, event) {
    this.props.operandChange(operandValue)
  }

  renderButton (glyph, value) {
    const [bsStyle, bsActive, bsPressed] = (this.props.operatorValue === value) ?
      ['primary', true, 'true'] : ['default', false, 'false']
    return (
      <Button
        onClick={this.props.operatorChange.bind(null, value)}
        bsSize='large'
        bsStyle={bsStyle}
        active={bsActive}
        aria-pressed={bsPressed}
      >
        <Glyphicon glyph={glyph} />
      </Button>
    )
  }

  render () {
    return (
      <ButtonGroup>
        {this.renderButton('plus', OPERATORS.plus)}
        {this.renderButton('minus', OPERATORS.minus)}
        {this.renderButton('remove', OPERATORS.times)}
      </ButtonGroup>
    )
  }
}

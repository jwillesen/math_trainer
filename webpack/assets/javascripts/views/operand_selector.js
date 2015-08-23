import React, {PropTypes} from 'react'
import {Pagination} from 'react-bootstrap'

export default class OperandSelector extends React.Component {
  static get propTypes () {
    return {
      minOperandValue: PropTypes.number,
      maxOperandValue: PropTypes.number,
      operandIndex: PropTypes.number.isRequired,
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

  handleOperandChange (event, selectedEvent) {
    const operandValue = selectedEvent.eventKey
    this.props.operandChange(this.props.operandIndex, operandValue)
  }

  render () {
    return (
      <Pagination
        bsSize='large'
        items={this.props.maxOperandValue}
        activePage={this.props.operandValue}
        onSelect={this.handleOperandChange.bind(this)}
      />
    )
  }
}

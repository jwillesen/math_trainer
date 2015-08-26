import React, {PropTypes} from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap'
import OperandSelector from './operand_selector'
import OperatorSelector from './operator_selector'

export default class Configuration extends React.Component
{
  static get propTypes () {
    return {
      changeOperand: PropTypes.func.required,
      changeOperator: PropTypes.func.required,
    }
  }

  render () {
    const labelWidth = 2
    return (
      <div>
        <h1>Welcome to Math Trainer</h1>
        <Grid><Row>
          <Col md={labelWidth}>
            <label className='control-label'>Operator</label>
          </Col><Col>
            <OperatorSelector
              operatorValue={this.props.configuration.operator}
              operatorChange={this.props.changeOperator}
            />
          </Col>
        </Row><Row>
          <Col md={labelWidth}>
            <label className='control-label'>First Operand Limit</label>
          </Col><Col>
            <OperandSelector
              operandValue={this.props.configuration.operands[0]}
              operandChange={this.props.changeOperand.bind(null, 0)}
            />
          </Col>
        </Row><Row>
          <Col md={labelWidth}>
            <label className='control-label'>Second Operand Limit</label>
          </Col><Col>
            <OperandSelector
              operandValue={this.props.configuration.operands[1]}
              operandChange={this.props.changeOperand.bind(null, 1)}
            />
          </Col>
        </Row></Grid>
        <div>
          <Button bsStyle='primary' onClick={this.props.startChallenge}>Play</Button>
        </div>
      </div>
    )
  }
}

import React from 'react'
import {Button, Grid, Row, Col} from 'react-bootstrap'
import OperandSelector from './operand_selector'

export default class Configuration extends React.Component
{
  render () {
    const labelWidth = 2
    return (
      <div>
        <h1>Welcome to Math Trainer</h1>
        <Grid><Row>
          <Col md={labelWidth}>
            <label className='control-label'>First Operand Limit</label>
          </Col><Col>
            <OperandSelector
              operandValue={this.props.configuration.operands[0]}
              operandChange={this.props.changeOperand.bind(this, 0)}
            />
          </Col>
        </Row><Row>
          <Col md={labelWidth}>
            <label className='control-label'>Second Operand Limit</label>
          </Col><Col>
            <OperandSelector
              operandValue={this.props.configuration.operands[1]}
              operandChange={this.props.changeOperand.bind(this, 1)}
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

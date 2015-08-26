import React, {PropTypes} from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

export default class ProblemDisplay extends React.Component {
  static get propTypes () {
    return {
      problem: PropTypes.object.isRequired,
    }
  }

  render () {
    return (
      <Grid className='problem'><Row>
        <Col className='operand' xs={1} xsOffset={6}>{this.props.problem.operands[0]}</Col>
      </Row><Row>
        <Col className='operator' xsOffset={5} xs={1}>{this.props.problem.operator}</Col>
        <Col className='operand' xs={1}>{this.props.problem.operands[1]}</Col>
      </Row></Grid>
    )
  }
}

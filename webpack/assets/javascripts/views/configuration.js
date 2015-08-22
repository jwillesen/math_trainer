import React from 'react'
import {Button} from 'react-bootstrap'

export default class Configuration extends React.Component
{
  render () {
    return (
      <div>
        <h1>Welcome to Math Trainer</h1>
        <Button bsStyle='primary' onClick={this.props.startChallenge}>Play</Button>
      </div>
    )
  }
}

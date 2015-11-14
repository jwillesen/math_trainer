import React, {PropTypes} from 'react'

export default class TimerSpan extends React.Component {
  static get propTypes () {
    return {
      start: PropTypes.number.isRequired,
      timerIntervalMs: PropTypes.number,
    }
  }

  static get defaultProps () {
    return {
      timerIntervalMs: 500,
    }
  }

  componentWillMount () {
    this.updateDuration()
    this.interval = setInterval(
      () => this.updateDuration(),
      this.props.timerIntervalMs)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  updateDuration () {
    this.setState({duration: Date.now() - this.props.start})
  }

  durationString () {
    const durationIsoString = new Date(this.state.duration).toISOString()
    return durationIsoString.slice(-13, -5)
  }

  render () {
    return <span {...this.props}>{this.durationString()}</span>
  }
}

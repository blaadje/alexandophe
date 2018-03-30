import * as React from 'react'

import * as moment from 'moment'

import './style.scss'

interface State { }
interface Props { }

export default class Counter extends React.Component<Props, State> {
  render() {
    const date = moment('2018-02-23T20:06:07.000').fromNow(true)

    return (
      <strong>{date} now</strong>
    )
  }
}
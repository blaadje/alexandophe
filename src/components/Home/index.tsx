import * as React from 'react'

import Slider from '../Slider'
import Counter from '../Counter'

import './style.scss'

interface State { }
interface Props { }

export default class Home extends React.Component<Props, State> {
  render () {
    return (
      <>
        <div className='Content'>
          <p>Ophelie and Alex are together for</p>
          <Counter />
          <i className='heart'>♥</i>
        </div>
        <Slider images={[ 
          'assets/image1.jpeg',
          'assets/image2.jpeg',
          'assets/image3.jpeg',
          'assets/image4.jpeg',
          'assets/image5.jpeg',
          'assets/image6.jpeg'
        ]} />
      </>
    )
  }
}
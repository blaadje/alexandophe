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
          '/src/assets/image1.jpeg',
          '/src/assets/image2.jpeg',
          '/src/assets/image3.jpeg',
          '/src/assets/image4.jpeg',
          '/src/assets/image5.jpeg',
          '/src/assets/image6.jpeg'
        ]} />
      </>
    )
  }
}
import * as React from 'react'

import Slider from '../Slider'
import Counter from '../Counter'

import { CSSTransition } from 'react-transition-group'

import './style.scss'

interface State {
  loaded: Boolean
}
interface Props { }

export default class Home extends React.Component<Props, State> {
  constructor (props: Props, state: State) {
    super(props)
    this.state = {
      loaded: false
    }
  }
 
  render () {
    return (
      <>
        <CSSTransition
          in={!this.state.loaded}
          timeout={300}
          classNames="message"
        >
          <div className='Loader' />
        </CSSTransition>

        <div className='Content'>
          <p>Ophélie and Alexandre are together for</p>
          <Counter />
          <i className='heart'>♥</i>
        </div>
        
        <Slider 
          loaded={() => this.setState({ loaded: true })}
          images={[ 
            'assets/image0.jpeg',
            'assets/image1.jpeg',
            'assets/image3.jpeg',
            'assets/image4.jpeg',
            'assets/image5.jpeg',
            'assets/image6.jpeg'
          ]}
         />
      </>
    )
  }
}
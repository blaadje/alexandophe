import * as React from 'react'

import Slider from '../Slider'
import Counter from '../Counter'

const song = require('assets/song.mp3')

import { CSSTransition }  from 'react-transition-group'

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
      <div>
        <audio autoPlay loop>
          <source src={song} type="audio/mpeg" />
        </audio>

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
            'assets/image1.jpeg',
            'assets/image2.jpeg',
            'assets/image3.jpeg',
            'assets/image4.jpeg',
            'assets/image5.jpg',
            'assets/image6.jpeg'
          ]}
         />
      </div>
    )
  }
}
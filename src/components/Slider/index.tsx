import * as React from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import './style.scss'

interface State { }
interface SliderProps {
  images: Array<string>
}

export default class Slider extends React.Component<SliderProps, State> {
  constructor(props: SliderProps) {
    super(props)
  }

  public render () {
    return (
      <div className='Slider-wrapper'>
        <Carousel
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          autoPlay={true}
          interval={6000}
          transitionTime={1000}
        >
          {
            this.props.images.map((item: string) => {
              return (
                <div key={item}>
                  <img 
                    className="Slider-image"
                    onLoad={() => console.log('image loadded')}
                    src={item}
                    alt=""
                  />
                </div>
              )
            })
          }
        </Carousel>
      </div>
    )
  }
}
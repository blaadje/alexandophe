import * as React from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import './style.scss'

interface State { 
  index: number
  delay: number
  changeIndex: number
}
interface SliderProps {
  images: Array<string>
  onChange: () => void
  loaded: () => void
}

export default class Slider extends React.Component<SliderProps, State> {
  constructor(props: SliderProps) {
    super(props)
    this.state = {
      index: 1,
      changeIndex: 1,
      delay: 7000
    }
  }

  componentDidMount () {
    setInterval(() => this.setState({ index: this.state.index + 1 }), this.state.delay)
  }

  public render () {
    return (
      <div className='Slider-wrapper'>
        <Carousel
          showThumbs={false}
          showArrows={false}
          selectedItem={this.state.index}
          showIndicators={false}
          onChange={() => {
            this.setState({ changeIndex: this.state.changeIndex + 1 })
            if (this.state.changeIndex === 10) {
              this.props.onChange()
              this.setState({ changeIndex: 0 })
            }
          }}
          autoPlay={true}
          transitionTime={700}
        >
          {
            this.props.images.map((item: string, index) => {
              return (
                <div key={item}>
                  <img 
                    className="Slider-image"
                    onLoad={() => {
                      if(index === 0) {
                        this.props.loaded()
                      }
                    }}
                    src={`https://img.imageboss.me/width/1920/quality:60/${item}`}
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
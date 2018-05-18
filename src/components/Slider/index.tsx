import * as React from 'react'

import Slick from 'react-slick'

import './style.scss'

interface State { }
interface SliderProps {
  images: Array<string>,
  loaded: () => void
}

export default class Slider extends React.Component<SliderProps, State> {
  constructor(props: SliderProps) {
    super(props)
  }

  public render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      fade: false,
      easing: 'ease',
      autoplay: true,
      autoplaySpeed: 3500,
      adaptativeHeight: false,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <>
        <div className='Slider-wrapper'>
          
          <Slick {...settings}>
            {
              this.props.images.map((item: string, i) => {
                return (
                  <div key={i}>
                    <img 
                      onLoad={() => setTimeout(() => this.props.loaded(), 2000)}
                      src={require(`../../${item}`)} alt="" />
                  </div>
                )
              })
            }
          </Slick>
        </div>
        <div className='Slider-filter'/>
      </>
    )
  }
}
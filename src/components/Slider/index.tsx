import * as React from 'react'

import Slick from 'react-slick'

import './style.scss'

interface State { }
interface SliderProps {
  images: Array<string>
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
      fade: true,
      autoplay: true,
      autoplaySpeed: 7000,
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
                return <div key={i}><img src={item} alt="" /></div>
              })
            }
          </Slick>
        </div>
        <div className='Slider-filter'/>
      </>
    )
  }
}
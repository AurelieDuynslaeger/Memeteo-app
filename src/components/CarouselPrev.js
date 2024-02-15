import { Carousel } from 'antd'
import React from 'react'

const CarouselPrev = () => {

  const onChange = (currentSlide) => {
    console.log(currentSlide)
}

  return (
    <Carousel afterChange={onChange}>
      <div>

      </div>

    </Carousel>
  )
}

export default CarouselPrev
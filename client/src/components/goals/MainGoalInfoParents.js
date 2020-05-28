import React, { useEffect } from 'react'
import MainGoalInfoParent from './MainGoalInfoParent'

const MainGoalInfoParents = ({ goals }) => {
  const M = window.M

  useEffect(() => {
    var parentCarousel = document.querySelectorAll('.carousel')
    M.Carousel.init(parentCarousel, {})
  })
  return (
    <div class='carousel'>
      {goals &&
        goals.length > 0 &&
        goals.map((goal, index) => (
          <a className='carousel-item' href={`#${index}`}>
            <MainGoalInfoParent goal={goal} />
          </a>
        ))}
    </div>
  )
}

export default MainGoalInfoParents

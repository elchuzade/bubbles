import React, { Fragment, useEffect } from 'react'
import MainGoalInfoParent from './MainGoalInfoParent'
import { Link } from 'react-router-dom'

const MainGoalInfo = ({ parents, goal: { deadline, repeat, progress } }) => {
  const M = window.M

  useEffect(() => {
    var parentCarousel = document.querySelectorAll('.carousel')
    M.Carousel.init(parentCarousel, {})
  })
  return (
    <div className='card large white z-depth-1 goal-info-card'>
      <div className='card-content'>
        <ul className='collection'>
          <li className='collection-item' style={{ height: '60px' }}>
            <span className='badge'>{deadline}</span>
            <span>Deadline</span>
          </li>
          <li className='collection-item' style={{ height: '60px' }}>
            <span className='badge'>{repeat}</span>
            <span>Repeat</span>
          </li>
          <li className='collection-item' style={{ height: '60px' }}>
            <div className='row mb0'>
              <div className='col m4'>
                <span>Progress</span>
              </div>
              <div className='col m8 pt10'>
                <div className='progress'>
                  <div
                    className='determinate'
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        {parents && parents.length > 0 && (
          <Fragment>
            <p className='flow-text'>Parent</p>
            <div class='carousel'>
              {parents.map((goal, index) => (
                <Link className='carousel-item' to={`/goals/${goal._id}`} key={index}>
                  <MainGoalInfoParent goal={goal} />
                </Link>
              ))}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default MainGoalInfo

import React, { Fragment, useEffect } from 'react'
import MainGoalInfoParent from '../../MainGoalInfoParent'
import { Link } from 'react-router-dom'
import Deadline from './Deadline'
import Repeat from './Repeat'
import Progress from './Progress'

const MainGoalInfo = ({
  parents,
  goal: { _id, deadline, repeat, progress }
}) => {
  const M = window.M

  useEffect(() => {
    var parentCarousel = document.querySelectorAll('.carousel')
    M.Carousel.init(parentCarousel, {})
  })
  return (
    <div className='card large white z-depth-1 goal-info-card'>
      {/* <div className='card-content'> */}
      <ul
        className='collection'
        style={{ borderLeft: 'none', borderRight: 'none' }}
      >
        <li className='collection-item' style={{ height: '80px' }}>
          <Deadline _id={_id} deadline={deadline} />
        </li>
        <li className='collection-item' style={{ height: '80px' }}>
          <Repeat _id={_id} repeat={repeat} />
        </li>
        <li className='collection-item' style={{ height: '80px' }}>
          <Progress _id={_id} progress={progress} />
        </li>
      </ul>
      {parents && parents.length > 0 && (
        <Fragment>
          <p className='flow-text'>Parent</p>
          <div className='carousel'>
            {parents.map((goal, index) => (
              <Link
                className='carousel-item'
                to={`/goals/${goal._id}`}
                key={index}
              >
                <MainGoalInfoParent goal={goal} />
              </Link>
            ))}
          </div>
        </Fragment>
      )}
      {/* </div> */}
    </div>
  )
}

export default MainGoalInfo

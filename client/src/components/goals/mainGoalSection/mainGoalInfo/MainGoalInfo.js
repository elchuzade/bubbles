import React, { Fragment, useEffect, useState } from 'react'
import MainGoalInfoParent from '../../MainGoalInfoParent'
import { Link } from 'react-router-dom'
import Deadline from './Deadline'
import Repeat from './Repeat'

const MainGoalInfo = ({
  parents,
  goal: { _id, deadline, repeat, progress }
}) => {
  const M = window.M

  const [editRepeat, setEditRepeat] = useState(false)
  const [editProgress, setEditProgress] = useState(false)
  const [repeatInput, setRepeatInput] = useState('')
  const [progressInput, setProgressInput] = useState('')

  progress = {
    current: 180,
    max: 200
  }
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
        <li className='collection-item' style={{ height: '60px' }}>
          <Deadline _id={_id} deadline={deadline} />
        </li>
        <li className='collection-item' style={{ height: '60px' }}>
          <Repeat _id={_id} repeat={repeat} />
        </li>
        <li className='collection-item' style={{ height: '60px' }}>
          <div className='row m0 valign-wrapper'>
            <div className='col s3'>
              <span className='grey-text'>Progress</span>
            </div>
            <div className='col s6'>
              <div className='goal-info-card-progress'>
                <span className='goal-info-card-progress-left grey-text'>
                  0
                </span>
                <span
                  className='goal-info-card-progress-center'
                  style={{
                    left: `${(progress.current * 100) / progress.max}%`
                  }}
                >
                  {progress.current}
                </span>
                <span className='goal-info-card-progress-right grey-text'>
                  {progress.max}
                </span>
              </div>
              <div
                className='progress'
                style={{ height: '10px', marginTop: '-10px' }}
              >
                <div
                  className='determinate'
                  style={{
                    width: `${(progress.current * 100) / progress.max}%`
                  }}
                />
              </div>
            </div>
            <div className='col s3'>
              <button
                className='btn-flat'
                onClick={() => setEditProgress(true)}
              >
                <i className='material-icons'>edit</i>
              </button>
            </div>
          </div>
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

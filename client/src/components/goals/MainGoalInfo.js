import React, { Fragment } from 'react'
import MainGoalInfoParents from './MainGoalInfoParents'

const MainGoalInfo = ({ parents, goal: { deadline, repeat, progress } }) => {
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
        {parents && parents.length > 0 (
          <Fragment>
            <p className='flow-text'>Parent</p>
            <MainGoalInfoParents goals={parents} />
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default MainGoalInfo

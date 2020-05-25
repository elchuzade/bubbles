import React from 'react'
import MainGoalInfoParent from './MainGoalInfoParent'

const MainGoalInfo = () => {
  return (
    <div className='card large white z-depth-1 goal-info-card'>
      <div className='card-content'>
        <ul className='collection'>
          <li className='collection-item' style={{ height: '60px' }}>
            <span className='badge'>20 April 2021</span>
            <span>Deadline</span>
          </li>
          <li className='collection-item' style={{ height: '60px' }}>
            <span className='badge'>Daily</span>
            <span>Repeat</span>
          </li>
          <li className='collection-item' style={{ height: '60px' }}>
            <div className='row mb0'>
              <div className='col m4'>
                <span>Progress</span>
              </div>
              <div className='col m8 pt10'>
                <div className='progress'>
                  <div className='determinate' style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p className='flow-text'>Parent</p>
        <MainGoalInfoParent />
      </div>
    </div>
  )
}

export default MainGoalInfo

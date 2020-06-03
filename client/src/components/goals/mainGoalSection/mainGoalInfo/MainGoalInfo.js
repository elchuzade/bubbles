import React, { Fragment } from 'react'
import MainGoalInfoParent from './MainGoalInfoParent'
import Deadline from './Deadline'
import Repeat from './Repeat'
import Progress from './Progress'
import Parents from './Parents'

const MainGoalInfo = ({
  history,
  goal: { parents, _id, deadline, repeat, progress }
}) => {
  return (
    <div className='card large white z-depth-1 goal-info-card'>
      <ul
        className='collection'
        style={{ borderLeft: 'none', borderRight: 'none' }}
      >
        <li
          className='collection-item valign-wrapper'
          style={{ height: '80px' }}
        >
          <Deadline _id={_id} deadline={deadline} />
        </li>
        <li
          className='collection-item valign-wrapper'
          style={{ height: '80px' }}
        >
          <Repeat _id={_id} repeat={repeat} />
        </li>
        <li
          className='collection-item valign-wrapper'
          style={{ height: '80px' }}
        >
          <Progress _id={_id} progress={progress} />
        </li>
      </ul>
      {parents && parents.length > 0 && (
        <Fragment>
          <Parents _id={_id} parents={parents} />
          <MainGoalInfoParent history={history} parents={parents} />
        </Fragment>
      )
      }
    </div >
  )
}

export default MainGoalInfo

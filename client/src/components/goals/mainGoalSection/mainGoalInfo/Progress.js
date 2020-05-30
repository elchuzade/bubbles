import React, { Fragment, useState, useEffect, useContext } from 'react'
import GoalContext from '../../../../context/goal/goalContext'

const Progress = ({ _id, progress }) => {
  const M = window.M

  const [editProgress, setEditProgress] = useState(false)
  const [progressInput, setProgressInput] = useState({ current: 0, max: 100 })

  const goalContext = useContext(GoalContext)

  const { patchGoal } = goalContext

  // Set progressInput value
  useEffect(() => {
    if (progress) setProgressInput(progress)
  }, [progress])

  // Initialize range input
  useEffect(() => {
    var progressInputDOM = document.querySelectorAll('.progressInput')
    M.Range.init(progressInputDOM)
  }, [editProgress])

  const saveProgress = () => {
    setEditProgress(false)
    patchGoal(_id, { progress: progressInput })
  }

  return (
    <Fragment>
      {editProgress ? (
        <div className='row m0'>
          <div className='col s8'>
            <div className='goal-info-card-progress-input'>
              <span className='goal-info-card-progress-left grey-text'>0</span>
              <span
                className='goal-info-card-progress-center'
                style={{
                  left: `${(progressInput.current * 100) / progressInput.max}%`
                }}
              >
                {progressInput.current}
              </span>
              <span className='goal-info-card-progress-right-input grey-text'>
                <input
                  id='progressInputMax'
                  type='number'
                  value={progressInput.max}
                  onChange={e =>
                    setProgressInput({ ...progressInput, max: e.target.value })
                  }
                />
              </span>
            </div>
            <p className='range-field m0 mt10'>
              <input
                className="browser-default"
                type='range'
                id='progressInput'
                min='0'
                max={progressInput.max}
                onChange={e =>
                  setProgressInput({
                    ...progressInput,
                    current: e.target.value
                  })
                }
                value={progressInput.current}
              />
            </p>
          </div>
          <div className='col s4'>
            <button
              className='btn-flat green white-text right'
              onClick={saveProgress}
            >
              <i className='material-icons'>save</i>
            </button>
          </div>
        </div>
      ) : (
        <div className='row m0 valign-wrapper'>
          {console.log(progressInput)}
          <div className='col s3'>
            <span className='grey-text'>Progress</span>
          </div>
          <div className='col s6'>
            <div className='goal-info-card-progress'>
              <span className='goal-info-card-progress-left grey-text'>0</span>
              <span
                className='goal-info-card-progress-center'
                style={{
                  left: `${(progressInput.current * 100) / progressInput.max}%`
                }}
              >
                {progressInput.current}
              </span>
              <span className='goal-info-card-progress-right grey-text'>
                {progressInput.max}
              </span>
            </div>
            <div
              className='progress'
              style={{ height: '10px', marginTop: '-10px' }}
            >
              <div
                className='determinate'
                style={{
                  width: `${(progressInput.current * 100) / progressInput.max}%`
                }}
              />
            </div>
          </div>
          <div className='col s3'>
            <button
              className='btn-flat right'
              onClick={() => setEditProgress(true)}
            >
              <i className='material-icons'>edit</i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Progress

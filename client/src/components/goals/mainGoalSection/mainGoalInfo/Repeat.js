import React, { Fragment, useState, useEffect, useContext } from 'react'
import GoalContext from '../../../../context/goal/goalContext'

const Repeat = ({ _id, repeat }) => {
  const M = window.M

  const [editRepeat, setEditRepeat] = useState(false)
  const [repeatInput, setRepeatInput] = useState('Repeat')

  const goalContext = useContext(GoalContext)

  const { patchGoal } = goalContext

  // Set repeatInput to a repeat value if that exists
  useEffect(() => {
    setRepeatInput(repeat)
  }, [repeat])

  useEffect(() => {
    let repeatInputDOM = document.getElementById('repeatInput')
    M.FormSelect.init(repeatInputDOM, {})
  }, [editRepeat])

  const saveRepeat = () => {
    if (repeatInput && repeatInput !== 'Repeat')
      patchGoal(_id, { repeat: repeatInput })

    setEditRepeat(false)
  }
  return (
    <Fragment>
      {editRepeat ? (
        <div className='row m0 valign-wrapper w100'>
          <div className='col s8'>
            <form>
              <select
                id='repeatInput'
                value={repeatInput}
                onChange={e => setRepeatInput(e.target.value)}
              >
                <option value='' disabled>
                  Repeat
                </option>
                <option value='daily'>Daily</option>
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
              </select>
            </form>
          </div>
          <div className='col s4'>
            <button
              className='btn-flat green white-text right'
              onClick={saveRepeat}
            >
              <i className='material-icons'>save</i>
            </button>
          </div>
        </div>
      ) : (
        <div className='row m0 valign-wrapper w100'>
          <div className='col s3'>
            <span className='grey-text'>Repeat</span>
          </div>
          <div className='col s6'>
            <h6 style={{ margin: 0, padding: 0 }}>
              {repeat && repeat.charAt(0).toUpperCase() + repeat.slice(1)}
            </h6>
          </div>
          <div className='col s3'>
            <button
              className='btn-flat right'
              onClick={() => setEditRepeat(true)}
            >
              <i className='material-icons'>{repeat ? 'edit' : 'add'}</i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Repeat

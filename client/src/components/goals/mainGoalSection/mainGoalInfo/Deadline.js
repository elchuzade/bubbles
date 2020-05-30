import React, { Fragment, useState, useEffect, useContext } from 'react'
import Moment from 'react-moment'
import GoalContext from '../../../../context/goal/goalContext'

const Deadline = ({ _id, deadline }) => {
  const M = window.M

  const [editDeadline, setEditDeadline] = useState(false)
  const [deadlineInput, setDeadlineInput] = useState('')

  const goalContext = useContext(GoalContext)

  const { patchGoal } = goalContext

  useEffect(() => {
    var deadlineInputDOM = document.querySelectorAll('.datepicker')
    M.Datepicker.init(deadlineInputDOM, {
      selectMonths: true,
      selectYears: 15,
      onSelect: date => {
        setDeadlineInput(date)
      }
    })
  }, [editDeadline])

  const saveDeadline = () => {
    setEditDeadline(false)
    patchGoal(_id, { deadline: deadlineInput })
  }

  return (
    <Fragment>
      {editDeadline ? (
        <div className='row m0'>
          <div className='col s8'>
            <input
              type='text'
              className='datepicker'
              id='deadlineInput'
              placeholder='Deadline'
            />
          </div>
          <div className='col s4'>
            <button
              className='btn-flat green white-text right'
              onClick={saveDeadline}
            >
              <i className='material-icons'>save</i>
            </button>
          </div>
        </div>
      ) : (
        <div className='row m0 valign-wrapper'>
          <div className='col s3'>
            <span className='grey-text'>Deadline</span>
          </div>
          <div className='col s6'>
            <Moment format='D MMM YYYY' withTitle>
              {deadline}
            </Moment>
          </div>
          <div className='col s3'>
            <button className='btn-flat right' onClick={() => setEditDeadline(true)}>
              <i className='material-icons'>edit</i>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Deadline

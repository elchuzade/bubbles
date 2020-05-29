import React, { useState, useEffect, useContext } from 'react'
import GoalContext from '../../context/goal/goalContext'
// import DatePicker from 'react-datepicker'

const GoalModal = ({ editGoal, editMode, setEditMode }) => {
  const goalContext = useContext(GoalContext)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  // Move up filled input labels
  useEffect(() => {
    if (editGoal && editMode) {
      if (editGoal.title) {
        setTitle(editGoal.title)
        document.getElementById('titleLabel').classList.add('active')
      }
      if (editGoal.title)
        if (editGoal.text) {
          setText(editGoal.text)
          document.getElementById('textLabel').classList.add('active')
        }
    }
  }, [editGoal, editMode])

  // Move down empty input labels
  useEffect(() => {
    if (!editGoal || !editMode) {
      document.getElementById('titleLabel').classList.remove('active')
      document.getElementById('textLabel').classList.remove('active')
    }
  })

  // Initialize
  useEffect(() => {
    const M = window.M

    let repeatSelect = document.getElementById('repeatSelect')
    M.FormSelect.init(repeatSelect, {})

    const modalSettings = {
      dismissible: true,
      inDuration: 300,
      outDuration: 300,
      onCloseStart: () => {
        setTitle('')
        setText('')
        setEditMode(false)
      }
    }

    let goalModalDOM = document.getElementById('goalModal')
    M.Modal.init(goalModalDOM, modalSettings)

    // eslint-disable-next-line
  }, [])

  const { goal, addGoal, updateGoal } = goalContext

  // const deadlineInput = () => {
  //   return (
  //     <DatePicker
  //       selected={deadline ? new Date(deadline) : null}
  //       onFocus={() => {
  //         document.getElementById('deadlineLabel').classList.add('active')
  //       }}
  //       onBlur={() => {
  //         deadline === '' &&
  //           document.getElementById('deadlineLabel').classList.remove('active')
  //       }}
  //       onChange={date => setDeadline(date)}
  //       dateFormat='MMMM d, yyyy'
  //     />
  //   )
  // }

  const submitGoalModal = () => {
    if (editMode) {
      updateGoal(goal._id, { title, text })
    } else {
      addGoal(goal._id, { title, text })
    }
  }

  return (
    <div className='modal' id='goalModal'>
      <div className='modal-content'>
        <h5 className='mb30'>{editMode ? 'Edit' : 'Add New'} Goal</h5>
        <div className='input-field'>
          <input
            id='title'
            type='text'
            name={title}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor='title' id='titleLabel'>
            Title
          </label>
        </div>
        <div className='input-field'>
          <textarea
            className='materialize-textarea'
            id='text'
            name={text}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <label htmlFor='text' id='textLabel'>
            Description
          </label>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          className='btn green waves-effect waves-white'
          onClick={submitGoalModal}
        >
          Save
        </button>
        <a className='modal-action modal-close waves-effect waves-green btn-flat'>
          Cancel
        </a>
      </div>
    </div>
  )
}

export default GoalModal

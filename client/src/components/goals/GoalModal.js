import React, { useState, useEffect, useContext } from 'react'
import GoalContext from '../../context/goal/goalContext'

const GoalModal = () => {
  const goalContext = useContext(GoalContext)

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [deadline, setDeadline] = useState('')
  const [repeat, setRepeat] = useState('')

  // Initialize modals
  useEffect(() => {
    const M = window.M

    let deadlineDatepicker = document.getElementById('goalDeadline')
    M.Datepicker.init(deadlineDatepicker, {
      autoClose: true,
      onSelect: date => setDeadline(date),
      selectMonths: true,
      selectYears: 15
    })

    let repeatSelect = document.getElementById('repeatSelect')
    M.FormSelect.init(repeatSelect, {})
    // eslint-disable-next-line
  }, [])

  const { goal, addGoal } = goalContext

  return (
    <div className='modal' id='goalModal'>
      <div className='modal-content'>
        <h5 className='mb30'>Add New Goal</h5>
        <div className='input-field'>
          <input
            id='name'
            type='text'
            name={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor='name'>Title</label>
        </div>
        <div className='input-field'>
          <textarea
            className='materialize-textarea'
            id='goal'
            name={text}
            onChange={e => setText(e.target.value)}
          />
          <label htmlFor='goal'>Description</label>
        </div>
        <div className='input-field'>
          <input
            type='text'
            id='goalDeadline'
            className='datepicker'
            name={deadline}
          />
          <label htmlFor='goalDeadline'>Deadline</label>
        </div>
        <div className='input-field'>
          <select
            defaultValue=''
            id='repeatSelect'
            name={repeat}
            onChange={e => setRepeat(e.target.value)}
          >
            <option value=''>How Often?</option>
            <option value='daily'>Daily</option>
            <option value='bidiurnally'>Bidiurnally</option>
            <option value='weekly'>Weekly</option>
            <option value='biweekly'>Biweekly</option>
            <option value='monthly'>Monthly</option>
            <option value='bimonthly'>Bimonthly</option>
            <option value='biennially'>Biennially</option>
            <option value='annually'>Annually</option>
            <option value='biannually'>Biannually</option>
          </select>
          <label>Repeat</label>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          className='btn green waves-effect waves-white'
          onClick={() => addGoal(goal._id, { title, text, deadline, repeat })}
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

import React from 'react'

const GoalModal = ({ goal, setGoal }) => {
  return (
    <div className='modal' id='goalModal'>
      <div className='modal-content'>
        <h5 className='mb30'>Add New Goal</h5>
        <div className='input-field'>
          <input
            id='name'
            type='text'
            name={goal.title}
            onChange={e => setGoal({ ...goal, title: e.target.value })}
          />
          <label htmlFor='name'>Title</label>
        </div>
        <div className='input-field'>
          <textarea
            className='materialize-textarea'
            id='goal'
            name={goal.text}
            onChange={e => setGoal({ ...goal, text: e.target.value })}
          />
          <label htmlFor='goal'>Description</label>
        </div>
        <div className='input-field'>
          <input
            type='text'
            id='goalDeadline'
            className='datepicker'
            name={goal.deadline}
          />
          <label htmlFor='goalDeadline'>Deadline</label>
        </div>
        <div className='input-field'>
          <select
            defaultValue=''
            id='repeatSelect'
            name={goal.repeat}
            onChange={e => setGoal({ ...goal, repeat: e.target.value })}
          >
            <option value=''>How Often?</option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Annually'>Annually</option>
          </select>
          <label>Repeat</label>
        </div>
      </div>
      <div className='modal-footer'>
        <button
          className='btn green waves-effect waves-white'
          onClick={() => console.log(goal)}
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

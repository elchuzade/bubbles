import React from 'react'

const GoalModal = () => {
  return (
    <div className='modal' id='goalModal'>
      <div className='modal-content'>
        <h5 className='mb30'>Add New Goal</h5>
        <div className='input-field'>
          <input id='name' type='text' />
          <label htmlFor='name'>Title</label>
        </div>
        <div className='input-field'>
          <textarea className='materialize-textarea' id='goal'></textarea>
          <label htmlFor='goal'>Description</label>
        </div>
        <div className='input-field'>
          <input type='text' id='goalDeadline' className='datepicker' />
          <label htmlFor='goalDeadline'>Deadline</label>
        </div>
        <div className='input-field'>
          <select>
            <option value='' selected>
              Select Option
            </option>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Annually'>Annually</option>
          </select>
          <label>Repeat</label>
        </div>
      </div>
      <div className='modal-footer'>
        <a className='modal-action modal-close waves-effect waves-green btn-flat'>
          Cancel
        </a>
      </div>
    </div>
  )
}

export default GoalModal

import React, { useState, useEffect, useContext } from 'react'
import GoalContext from '../../context/goal/goalContext'

const GoalModal = ({ editGoal, editMode, setEditMode }) => {
  const M = window.M
  const goalContext = useContext(GoalContext)

  const [title, setTitle] = useState('')
  const [quoteText, setQuoteText] = useState('')
  const [quoteAuthor, setQuoteAuthor] = useState('')
  const [quoteStatus, setQuoteStatus] = useState(false)

  // Move up filled input labels
  // TODO: Some issue with this initialization. Figure out how to clean it up
  useEffect(() => {
    if (editGoal && editMode) {
      if (editGoal.title) {
        setTitle(editGoal.title)
        let titleLabel = document.getElementById('titleLabel')
        if (titleLabel) titleLabel.classList.add('active')
      }
      if (editGoal.quote && editGoal.quote.text)
        if (editGoal.quote.text) {
          setQuoteText(editGoal.quote.text)
          let textLabel = document.getElementById('textLabel')
          if (textLabel) textLabel.classList.add('active')
        }
      if (editGoal.quote && editGoal.quote.author)
        if (editGoal.quote && !quoteStatus) {
          setQuoteStatus(!quoteStatus)
          setQuoteAuthor(editGoal.quote.author)
        }
    }
  }, [editGoal, editMode])

  // Move up filled input label for author
  // TODO: Some issue with this initialization. Figure out how to clean it up
  useEffect(() => {
    let authorLabel = document.getElementById('authorLabel')
    if (authorLabel) authorLabel.classList.add('active')
  }, [editGoal, editMode, quoteStatus])

  // Initialize
  useEffect(() => {
    let goalModalDOM = document.getElementById('goalModal')
    M.Modal.init(goalModalDOM, {
      dismissible: true,
      inDuration: 300,
      outDuration: 300,
      onCloseStart: () => {
        setTitle('')
        setQuoteText('')
        setQuoteAuthor('')
        setEditMode(false)
      }
    })

    // eslint-disable-next-line
  }, [])

  const { goal, addGoal, updateGoal } = goalContext

  const submitGoalModal = () => {
    if (editMode) {
      updateGoal(goal._id, {
        title,
        quote: { text: quoteText, author: quoteAuthor }
      })
    } else {
      addGoal(goal._id, {
        title,
        quote: { text: quoteText, author: quoteAuthor }
      })
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
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor='title' id='titleLabel'>
            Title
          </label>
        </div>
        <div className='switch'>
          <label>
            Description
            <input
              checked={quoteStatus}
              type='checkbox'
              onChange={e => setQuoteStatus(!quoteStatus)}
            />
            <span className='lever'></span>
            Quote
          </label>
        </div>
        <div className='input-field'>
          <textarea
            className='materialize-textarea'
            id='text'
            value={quoteText}
            onChange={e => setQuoteText(e.target.value)}
          />
          <label htmlFor='text' id='textLabel'>
            {quoteStatus ? 'Quote' : 'Description'}
          </label>
        </div>
        {quoteStatus && (
          <div className='input-field'>
            <input
              id='author'
              type='text'
              value={quoteAuthor}
              onChange={e => setQuoteAuthor(e.target.value)}
            />
            <label htmlFor='author' id='authorLabel'>
              Author
            </label>
          </div>
        )}
      </div>
      <div className='modal-footer'>
        <button
          className='btn green waves-effect waves-white'
          onClick={submitGoalModal}
        >
          Save
        </button>
        <button className='modal-action modal-close waves-effect waves-green btn-flat'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default GoalModal

import React, { Fragment, useState, useEffect, useContext } from 'react'
import GoalContext from '../../../../context/goal/goalContext'

const Parents = ({ _id, parents }) => {
  const M = window.M

  const [editParents, setEditParents] = useState(false)
  const [parentsInput, setParentsInput] = useState([])


  const goalContext = useContext(GoalContext)

  const { updateParents, allGoals, getAllGoals } = goalContext

  useEffect(() => {
    getAllGoals()
  }, [])

  useEffect(() => {
    let defaultParentInput = []
    parents.forEach(parent => {
      defaultParentInput.push(parent._id)
    })
    setParentsInput(defaultParentInput)
  }, [parents])

  useEffect(() => {
    let parentsInputDOM = document.getElementById('parentsInput')
    M.FormSelect.init(parentsInputDOM, {})
  }, [editParents])

  const addParent = () => {
    let parentsInputDOM = document.getElementById('parentsInput')
    let instance = M.FormSelect.getInstance(parentsInputDOM)

    setParentsInput(instance.getSelectedValues())
  }

  const saveParents = () => {
    if (parentsInput && parentsInput.length > 0)
      updateParents(_id, { parents: parentsInput })

    setEditParents(false)
  }

  return (
    <Fragment>
      {editParents ? (
        <div className='row m0 valign-wrapper w100'>
          <div className='col s8'>
            <form className='ml20'>
              <select
                multiple
                id='parentsInput'
                value={parentsInput}
                onChange={addParent}
              >
                <option value='' disabled>
                  Choose Parents
                </option>
                {allGoals.filter(goal => goal._id !== _id).map((goal, index) => <option key={index} value={goal._id}>{goal.title}</option>)}
              </select>
            </form>
          </div>
          <div className='col s4'>
            <button
              className='btn-flat green white-text right mr20'
              onClick={saveParents}
            >
              <i className='material-icons'>save</i>
            </button>
          </div>
        </div>
      ) : (
          <div className='row m0 valign-wrapper w100'>
            <div className='col s3'>
              <span className='grey-text ml20'>Parents</span>
            </div>
            <div className='col s6' />
            <div className='col s3'>
              <button
                className='btn-flat right mr20'
                onClick={() => setEditParents(true)}
              >
                <i className='material-icons'>edit</i>
              </button>
            </div>
          </div>
        )}
    </Fragment>
  )
}

export default Parents

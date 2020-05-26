import React, { Fragment, useEffect, useContext } from 'react'
import MainGoal from '../../components/goals/MainGoal'
import MainGoalInfo from '../../components/goals/MainGoalInfo'
import SubGoals from '../../components/goals/SubGoals'
import Comments from '../../components/comments/Comments'
import GoalModal from '../../components/goals/GoalModal'
import CommentModal from '../../components/comments/CommentModal'
import Spinner from '../../components/layout/Spinner'

import GoalContext from '../../context/goal/goalContext'
import AuthContext from '../../context/auth/authContext'

const Goal = props => {
  const goalContext = useContext(GoalContext)
  const authContext = useContext(AuthContext)

  const { goal, parent, children, loading, getGoal } = goalContext
  const { user, loadUser } = authContext

  // Load user if not loaded
  useEffect(() => {
    if (!user) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [])

  // Get goal
  useEffect(() => {
    getGoal(props.match.params.id)
    // eslint-disable-next-line
  }, [])

  // Initialize modals
  useEffect(() => {
    const M = window.M
    const modalSettings = {
      dismissible: true,
      inDuration: 300,
      outDuration: 300
    }
    let commentModalDOM = document.getElementById('commentModal')
    M.Modal.init(commentModalDOM, modalSettings)

    let goalModalDOM = document.getElementById('goalModal')
    M.Modal.init(goalModalDOM, modalSettings)
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
      {goal !== null && !loading ? (
        <Fragment>
          <div className='row'>
            <div className='col s12 l6'>
              <MainGoal goal={goal} />
            </div>
            <div className='col s12 l6'>
              <MainGoalInfo goal={goal} parent={parent} />
            </div>
          </div>
          <SubGoals goals={children} />
          {goal.comments && goal.comments.length > 0 && (
            <Comments comments={goal.comments} />
          )}
          {/* MODALS */}
          <GoalModal />
          <CommentModal />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Goal

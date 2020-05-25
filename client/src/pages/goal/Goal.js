import React, { useEffect, useContext } from 'react'
import MainGoal from '../../components/goals/MainGoal'
import MainGoalInfo from '../../components/goals/MainGoalInfo'
import SubGoals from '../../components/goals/SubGoals'
import Comments from '../../components/comments/Comments'
import GoalModal from '../../components/goals/GoalModal'
import CommentModal from '../../components/comments/CommentModal'

import GoalContext from '../../context/goal/goalContext'

const Goal = () => {
  const goalContext = useContext(GoalContext)

  const { goal, parent, children, loading, getGoal } = goalContext

  // Get goal
  useEffect(() => {
    getGoal()
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
      <div className='row'>
        <div className='col s12 l6'>
          <MainGoal />
        </div>
        <div className='col s12 l6'>
          <MainGoalInfo />
        </div>
      </div>
      <SubGoals />
      <Comments />
      {/* MODALS */}
      <GoalModal />
      <CommentModal />
    </div>
  )
}

export default Goal

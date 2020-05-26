import React, { Fragment, useState, useEffect, useContext } from 'react'
import MainGoal from '../../components/goals/MainGoal'
import MainGoalInfo from '../../components/goals/MainGoalInfo'
import SubGoals from '../../components/goals/SubGoals'
import Comments from '../../components/comments/Comments'

import GoalModal from '../../components/goals/GoalModal'
import GoalAvatarModal from '../../components/goals/GoalAvatarModal'
import CommentModal from '../../components/comments/CommentModal'

import Spinner from '../../components/layout/Spinner'

import GoalContext from '../../context/goal/goalContext'
import AuthContext from '../../context/auth/authContext'

const Goal = props => {
  const [newGoal, setNewGoal] = useState({
    title: '',
    text: '',
    deadline: '',
    repeat: ''
  })

  const goalContext = useContext(GoalContext)
  const authContext = useContext(AuthContext)

  const {
    goal,
    parent,
    children,
    loading,
    getGoal,
    uploadGoalAvatar,
    deleteGoalAvatar,
    uploadGoalCroppedAvatar,
    deleteGoalCroppedAvatar,
    avatarUploadLoading,
    avatarDeleteLoading
  } = goalContext

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
  }, [props.match.params.id])

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

    let goalAvatarModalDOM = document.getElementById('goalAvatarModal')
    M.Modal.init(goalAvatarModalDOM, modalSettings)

    let deadlineDatepicker = document.getElementById('goalDeadline')
    M.Datepicker.init(deadlineDatepicker, {
      autoClose: true,
      onSelect: date => {
        setNewGoal({ ...goal, deadline: date })
      },
      selectMonths: true,
      selectYears: 15
    })

    let repeatSelect = document.getElementById('repeatSelect')
    M.FormSelect.init(repeatSelect, {})
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
          <Comments comments={goal.comments} />
          {/* MODALS */}
          <GoalModal setGoal={setNewGoal} goal={newGoal} />
          <GoalAvatarModal
            goal={goal}
            uploadGoalAvatar={uploadGoalAvatar}
            deleteGoalAvatar={deleteGoalAvatar}
            uploadGoalCroppedAvatar={uploadGoalCroppedAvatar}
            deleteGoalCroppedAvatar={deleteGoalCroppedAvatar}
            avatarUploadLoading={avatarUploadLoading}
            avatarDeleteLoading={avatarDeleteLoading}
          />
          <CommentModal />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Goal

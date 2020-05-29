import React, { Fragment, useState, useEffect, useContext } from 'react'
import MainGoal from '../../components/goals/MainGoal'
import MainGoalInfo from '../../components/goals/MainGoalInfo'
import SubGoals from '../../components/goals/SubGoals'
import Notes from '../../components/notes/Notes'

import GoalModal from '../../components/goals/GoalModal'
import GoalAvatarModal from '../../components/goals/GoalAvatarModal'
import NoteModal from '../../components/notes/NoteModal'

import Spinner from '../../components/layout/Spinner'

import GoalContext from '../../context/goal/goalContext'
import AuthContext from '../../context/auth/authContext'

const Goal = props => {
  const M = window.M

  const [editMode, setEditMode] = useState(false)

  const goalContext = useContext(GoalContext)
  const authContext = useContext(AuthContext)

  const {
    goal,
    parents,
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
    const modalSettings = {
      dismissible: true,
      inDuration: 300,
      outDuration: 300
    }
    let commentModalDOM = document.getElementById('commentModal')
    M.Modal.init(commentModalDOM, modalSettings)

    let goalAvatarModalDOM = document.getElementById('goalAvatarModal')
    M.Modal.init(goalAvatarModalDOM, modalSettings)
    // eslint-disable-next-line
  }, [])

  // Check if goal has changed
  useEffect(() => {
    toggleGoalModal(false)
  }, [goal])

  const toggleGoalModal = async open => {
    let goalModalDOM = document.getElementById('goalModal')
    var instance = M.Modal.getInstance(goalModalDOM)

    if (open) {
      instance.open()
    } else {
      instance.close()
    }
  }

  const toggleGoalAvatarModal = async open => {
    let goalAvatarModalDOM = document.getElementById('goalModal')
    var instance = M.Modal.getInstance(goalAvatarModalDOM)

    if (open) {
      instance.open()
    } else {
      instance.close()
    }
  }

  return (
    <div className='container'>
      {goal !== null && !loading ? (
        <Fragment>
          <div className='row'>
            <div className='col s12 l6'>
              <MainGoal
                toggleGoalModal={toggleGoalModal}
                setEditMode={setEditMode}
                goal={goal}
              />
            </div>
            <div className='col s12 l6'>
              <MainGoalInfo goal={goal} parents={parents} />
            </div>
          </div>
          <SubGoals toggleGoalModal={toggleGoalModal} goals={children} />
          <Notes notes={goal.notes} />
          {/* MODALS */}
          <GoalModal
            editGoal={goal}
            editMode={editMode}
            setEditMode={setEditMode}
          />
          <GoalAvatarModal
            goal={goal}
            uploadGoalAvatar={uploadGoalAvatar}
            deleteGoalAvatar={deleteGoalAvatar}
            uploadGoalCroppedAvatar={uploadGoalCroppedAvatar}
            deleteGoalCroppedAvatar={deleteGoalCroppedAvatar}
            avatarUploadLoading={avatarUploadLoading}
            avatarDeleteLoading={avatarDeleteLoading}
          />
          <NoteModal />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Goal

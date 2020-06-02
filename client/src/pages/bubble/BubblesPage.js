import React, { useState, useEffect, useContext } from 'react'

import GoalContext from '../../context/goal/goalContext'
import AuthContext from '../../context/auth/authContext'

import Lines from './Lines'
import Bubbles from './Bubbles'

const BubblesPage = props => {
  const goalContext = useContext(GoalContext)
  const authContext = useContext(AuthContext)

  const [goals, setGoals] = useState([])
  const [plainDims, setPlainDims] = useState({
    leftOffset: undefined,
    topOffset: 64,
    plainWidth: undefined,
    plainHeight: undefined,
    importanceFactor: undefined,
  })

  const { user, loadUser } = authContext
  const {
    goal,
    children,
    getGoal
  } = goalContext

  // Load user if not loaded
  useEffect(() => {
    if (!user) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [])

  // Get goal, sets goal, parents and children
  useEffect(() => {
    getGoal(props.match.params.id)
    // eslint-disable-next-line
  }, [props.match.params.id])

  useEffect(() => {
    if (Object.keys(goal).length > 0 && children.length > 0) {
      setGoals([goal, ...children])
    }
  }, [goal, children])

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = () => {
    setPlainDims({
      ...plainDims,
      leftOffset: window.innerWidth * 0.05,
      plainWidth: window.innerWidth * 0.9,
      plainHeight: window.innerHeight * 0.8,
      importanceFactor: window.innerWidth * 0.9 * 0.002
    });
  };

  return (
    <div>
      <div id="plain">
        <Lines plainDims={plainDims} goal={goals.find(g => g._id === goal._id)} children={goals.filter(g => g._id !== goal._id)} />
        <Bubbles plainDims={plainDims} goals={goals} setGoals={setGoals} />
      </div>
    </div>
  )
}

export default BubblesPage

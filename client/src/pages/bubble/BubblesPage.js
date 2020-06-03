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
    topOffset: 64,
    leftOffset: undefined,
    plainWidth: undefined,
    plainHeight: undefined,
    importanceFactor: undefined,
  })

  const { user, loadUser } = authContext
  const {
    goal,
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
    getGoal(props.match.params.id, 2)
    // eslint-disable-next-line
  }, [props.match.params.id])

  const containsObject = (obj, list) => {
    return list.some(elem => elem._id === obj._id)
  }

  useEffect(() => {
    if (Object.keys(goal).length > 0 && goal.children.length > 0) {

      let goalsFlatten = [goal]
      for (let i = 0; i < goal.children.length; i++) {
        for (let j = 0; j < goal.children[i].children.length; j++) {
          if (!containsObject(goal.children[i].children[j], goalsFlatten)) {
            goalsFlatten.push(goal.children[i].children[j])
          }
        }
        if (!containsObject(goal.children[i], goalsFlatten)) {
          goalsFlatten.push(goal.children[i])
        }
      }
      setGoals(goalsFlatten)
    }
  }, [goal])

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
      importanceFactor: window.innerWidth * 0.9 * 0.001
    });
  };

  return (
    <div>
      <div id="plain">
        <Lines plainDims={plainDims} goal={goal} />
        <Bubbles id={goal._id} plainDims={plainDims} goals={goals} setGoals={setGoals} />
      </div>
    </div>
  )
}

export default BubblesPage

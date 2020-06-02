import React, { Fragment, useState, useEffect, useContext } from 'react'
import Draggable from 'react-draggable';

import { PercentToPixel, PixelToPercent } from '../../utils/convertPixelPercent'

import GoalContext from '../../context/goal/goalContext'

const Bubbles = ({ id, plainDims, goals, setGoals }) => {
  const goalContext = useContext(GoalContext)

  const { moveGoals } = goalContext

  const [hover, setHover] = useState(false)
  const [dragItem, setDragItem] = useState({ id: '', importance: '' })


  const onStart = (e, id, importance, ui) => {
    e && e.preventDefault()
    setDragItem({ id, importance })
  }

  const onStop = (e, ui) => {
    // Take current position of the goal and send it to backend to update position
    e && e.preventDefault()
    // Access bubble attribute of a DOM element
    let bubbleCenterX = ui.x + (dragItem.importance / 2) * plainDims.importanceFactor;
    let bubbleCenterY = ui.y + (dragItem.importance / 2) * plainDims.importanceFactor;
    // New position of a dragged bubble
    let draggedBubblePosition = {
      x: PixelToPercent(bubbleCenterX, plainDims.plainWidth),
      y: PixelToPercent(bubbleCenterY, plainDims.plainHeight)
    };
    // Update position of the moved bubble
    let movedGoals = goals.map(goal => goal._id === dragItem.id ? { ...goal, position: draggedBubblePosition } : goal)
    setGoals(movedGoals)
    moveGoals(id, movedGoals)
  }

  const hoverOn = () => {
    setHover(true)
  }

  const hoverOff = () => {
    setHover(false)
  }

  return (
    <Fragment>
      {goals.length > 0 && goals.map((goal, index) =>
        <Draggable
          key={index}
          handle={'.handle'}
          defaultPosition={{
            x: PercentToPixel(goal.position.x, plainDims.plainWidth) - (goal.importance / 2) * plainDims.importanceFactor,
            y: PercentToPixel(goal.position.y, plainDims.plainHeight) - (goal.importance / 2) * plainDims.importanceFactor
          }}
          onStart={(e, ui) => onStart(e, goal._id, goal.importance, ui)}
          onStop={onStop}
          bounds='parent'
        >
          <div
            onMouseLeave={hoverOff}
            className='draggableCover'
          >
            <div>
              {/* First div is for deadline circle */}
              <div
                style={{
                  width: `${goal.importance *
                    plainDims.importanceFactor}px`
                }}
              >
                <img
                  onMouseEnter={hoverOn}
                  draggable='false'
                  src={
                    goal.croppedAvatar
                      ? goal.croppedAvatar.location
                      : 'https://via.placeholder.com/1000'
                  }
                  alt={goal.title}
                  className='handle responsive-img circle bubbleImage'
                />
                <span
                  style={{
                    top: `${(goal.importance / 2) *
                      plainDims.importanceFactor}px`
                  }}
                  className='imgText handle'
                >
                  {goal.title}
                </span>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </Fragment>
  )
}

export default Bubbles

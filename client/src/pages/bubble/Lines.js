import React, { Fragment } from 'react'
import { Line } from 'react-lineto';

import { PercentToPixel } from '../../utils/convertPixelPercent'

const Lines = ({ plainDims, goal }) => {
  const DrawLine = (parent, child) => {
    return (< Line
      zIndex={-1}
      x0={
        plainDims.leftOffset +
        PercentToPixel(
          parent.position.x,
          plainDims.plainWidth
        )
      }
      y0={
        plainDims.topOffset +
        PercentToPixel(
          parent.position.y,
          plainDims.plainHeight
        )
      }
      x1={
        plainDims.leftOffset +
        PercentToPixel(child.position.x, plainDims.plainWidth)
      }
      y1={
        plainDims.topOffset +
        PercentToPixel(child.position.y, plainDims.plainHeight)
      }
    />)
  }

  return <Fragment>
    {goal.children && goal.children.map((child, index) =>
      (<Fragment key={`${index}`}>
        {DrawLine(goal, child)}
        {child.children.map((grandChild, grandIndex) => (
          <Fragment key={`${index}-${grandIndex}`}>
            {DrawLine(child, grandChild)}
          </Fragment>
        ))}
      </Fragment>)
    )}
  </Fragment>
}

export default Lines

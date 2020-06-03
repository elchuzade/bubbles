import React, { Fragment } from 'react'
import { Line } from 'react-lineto';

import { PercentToPixel } from '../../utils/convertPixelPercent'

const Lines = ({ plainDims, goal }) => {
  const DrawLine = (parent, child, index) => (
    <Line
      zIndex={-1}
      key={index}
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
    />
  )

  return <Fragment>
    {goal.children && goal.children.map((child, index) =>
      (<>
        {DrawLine(goal, child, index)}
        {child.children.map((grandChild, grandIndex) => (
          DrawLine(child, grandChild, grandIndex)
        ))}
      </>)
    )}
  </Fragment>
}

export default Lines

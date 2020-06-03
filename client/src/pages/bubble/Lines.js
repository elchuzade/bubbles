import React, { Fragment } from 'react'
import { Line } from 'react-lineto';

import { PercentToPixel } from '../../utils/convertPixelPercent'

const Lines = ({ plainDims, goal }) => {
  return (
    <Fragment>
      {goal.children && goal.children.map((child, index) =>
        <Line
          zIndex={-1}
          key={index}
          x0={
            plainDims.leftOffset +
            PercentToPixel(
              goal.position.x,
              plainDims.plainWidth
            )
          }
          y0={
            plainDims.topOffset +
            PercentToPixel(
              goal.position.y,
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
      )}
    </Fragment>
  )
}

export default Lines

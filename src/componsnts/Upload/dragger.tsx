import React, { FC, useState, DragEvent } from 'react';
import classNames from 'classnames';

interface IDraggerProps {
  onFile: (file: FileList) => void
}

export const Dragger: FC<IDraggerProps> = (props) => {
  const { onFile, children } = props
  // 拖动的状态
  const [drageOver, setDrageOver] = useState(false)
  const classes = classNames('kewin-uploader-dragger', {
    'is-dragover': drageOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDrageOver(false)
    onFile(e.dataTransfer.files)
  }

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDrageOver(over)
  }
  return (
    <div
      className={classes}
      onDragOver={e => { handleDrag(e, true) }}
      onDragLeave={e => { handleDrag(e, false) }}
      onDrop={e => { handleDrop(e) }}
    >
      {children}
    </div>
  )
}

export default Dragger;
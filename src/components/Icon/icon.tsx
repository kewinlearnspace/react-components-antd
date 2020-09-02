import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IIConProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IIConProps> = (props) => {
  // icon-primary
  const { className, theme, ...restProps } = props
  const classes = classNames('kewin-icon', className, {
    [`icon-${theme}`]: theme
  })
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
}

export default Icon
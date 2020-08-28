import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Icon from '../Icon/icon'

// 输入框尺寸
type InputSize = 'lg' | 'sm'

// Omit可以忽略掉原生标签上的某个值
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**
   * 是否禁用input
   */
  disabled?: boolean,
  /**
   * 设置 input 大小,支持lg 或者 sm
   */
  size?: InputSize,
  /**
   * 添加图标，在右侧悬浮添加一个图标，用于提示
   */
  icon?: IconProp,
  /**
   * 添加前缀 用于配置一些固定组合
   */
  prepend?: string | ReactElement,
  /**
   * 添加后缀 用于配置一些固定组合
   */
  append?: string | ReactElement,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ~~~js
 * import { Input } from 'kewin-component'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  // 根据不同属性控制classname
  const classes = classNames('kewin-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  })
  // 处理state中未设置初始值的情况
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="kewin-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`} /></div>}
      <input
        className="kewin-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;

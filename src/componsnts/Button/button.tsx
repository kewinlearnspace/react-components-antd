import React from 'react';
import classNames from 'classnames';
// 常量一般使用枚举来创建
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

/**
 * React.ReactNode 可以接受各种类型
 * type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
 */
interface IButtonProps {
  className?: string,
  disabled?: boolean,
  size?: ButtonSize,
  btnType?: ButtonType,
  href?: string,
  children: React.ReactNode
}

const Button: React.FC<IButtonProps> = (props) => {
  const { btnType, disabled, size, href, children } = props
  // 默认存在btn类名 btn, btn-lg, btn-primary
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })
  // link
  if (btnType === ButtonType.Link && href) {
    return <a href={href} className={classes}>{children}</a>
  } else {
    return <button className={classes} disabled={disabled}>{children}</button>
  }
}

// 默认值设置
Button.defaultProps = {
  disabled: false,
  btnType:ButtonType.Default
};

export default Button

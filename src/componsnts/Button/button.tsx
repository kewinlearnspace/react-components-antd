import React, {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  FC
} from 'react';
import classNames from 'classnames';
// 常量一般使用枚举来创建

// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link'
// }

// 常量也可以使用字符串字面量来定义 
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
/**
 * React.ReactNode 可以接受各种类型
 * type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
 */
interface IBaseButtonProps {
  className?: string,
  /** 设置Button是否禁用 ,默认值是false*/
  disabled?: boolean,
  /** 设置Button的大小*/
  size?: ButtonSize,
  /** 设置Button的类型, 默认值是default*/
  btnType?: ButtonType,
  /** Button的类型为link时, 连接跳转设置*/
  href?: string,
  children: React.ReactNode
}

/**
 * 定义类型别名 获取到Button上原生的所有属性
 * 不能使用联合类型，联合类型返回的是a类型或者b类型 使用'|'进行连接
 * 使用TS语法的交叉类型 可以将多个类型进行叠加,包含所有类型 使用'&'进行连接
 */
// Button按钮
type NativeButtonProps = IBaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// a标签
type AnchorButtonProps = IBaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// Button与a 结合
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
/** 
 * ### Button组件的使用
 * ~~~js
 * import { Button } from 'kewin-component'
 * ~~~
*/
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    className,
    disabled,
    size,
    href,
    children,
    ...restProps
  } = props
  // 默认存在btn类名 btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && disabled
  })
  // link
  if (btnType === 'link' && href) {
    return <a href={href} className={classes} {...restProps} >{children}</a>
  } else {
    return <button className={classes} disabled={disabled} {...restProps} >{children}</button>
  }
}

// 默认值设置
Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};

export default Button

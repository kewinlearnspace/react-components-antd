import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
export interface ISubMenuProps {
  index?: string,
  title: string,
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<String>
  // 仅在vertical中可以默认打开
  const isOpen = index && context.mode === 'vertical' ? openedSubMenus.includes(index) : false
  const [menuOpen, setMenuOpen] = useState(isOpen)
  const classes = classNames('menu-item submenu-item', classNames, {
    'is-active': context.index === index,
    // 控制vertical下点击才进行旋转动画
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 300)
  }

  // 垂直 - 点击
  const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
  // 水平 - 悬浮
  const hoverEvents = context.mode !== 'vertical'
    ? {
      onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
      onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    }
    : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('kewin-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return <li key={index} className={classes} {...hoverEvents}>
    <div className="submenu-title" {...clickEvents}>
      {title}
      <Icon icon="arrow-down" className="arrow-icon" />
    </div>
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'
export default SubMenu

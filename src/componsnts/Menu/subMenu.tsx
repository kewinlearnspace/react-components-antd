import React, { useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';

export interface ISubMenuProps {
  index?: number,
  title: string,
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', classNames, {
    'is-active': context.index === index
  })
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    console.log(toggle)
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
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return <ul className={subMenuClasses}>
      {childrenComponent}
    </ul>
  }
  return <li key={index} className={classes} {...hoverEvents}>
    <div className="submenu-title" {...clickEvents}>
      {title}
    </div>
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'
export default SubMenu

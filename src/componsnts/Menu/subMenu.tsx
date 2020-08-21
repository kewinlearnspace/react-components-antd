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
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 3000)
  }

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
  return <li key={index} className={classes}>
    <div className="submenu-title" onClick={handleClick}>
      {title}
    </div>
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'
export default SubMenu

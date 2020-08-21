import React, { useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';

export interface ISubMenuProps {
  index?: number,
  title: string,
  className?: string
}

const SubMenu: React.FC<ISubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext)
  const classes = classNames('menu-item submenu-item', classNames, {
    'is-active': context.index === index
  })
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return <ul className="kewin-submenu">
      {childrenComponent}
    </ul>
  }
  return <li key={index} className={classes}>
    <div className="submenu-title">
      {title}
    </div>
    {renderChildren()}
  </li>
}

SubMenu.displayName = 'SubMenu'
export default SubMenu

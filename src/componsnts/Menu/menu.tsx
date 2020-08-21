import React, { createContext, useState } from 'react';
import { IMenuItemProps } from './menuItem';
import ClassNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: number) => void

export interface IMenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
  mode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = ClassNames('kewin-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: number) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传递给子组件的context集合
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode: mode
  }

  // 控制children渲染的节点组的渲染类型 =>仅支持渲染MenuItem组件
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // cloneElement将属性混入
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  return <ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {renderChildren()}
      {/* {children} */}
    </MenuContext.Provider>
  </ul>
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu
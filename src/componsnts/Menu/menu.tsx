import React, { createContext, useState } from 'react';
import { IMenuItemProps } from './menuItem';
import ClassNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void

export interface IMenuProps {
  // active 的菜单项的索引值
  defaultIndex?: string;
  className?: string;
  // 菜单类型 横向或者纵向 
  mode?: MenuMode;
  style?: React.CSSProperties;
  // 点击菜单项触发的回掉函数
  onSelect?: SelectCallback,
  // SubMenus是否展开
  defaultOpenSubMenus?: string[]
}

interface IMenuContext {
  index: string;
  // 选择某项时的出发事件
  onSelect?: SelectCallback;
  // 布局水平or垂直
  mode?: MenuMode;
  // 设置子菜单的默认打开 只在纵向模式下生效 
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = ClassNames('kewin-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 传递给子组件的context集合
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }

  // 控制children渲染的节点组的渲染类型 =>仅支持渲染MenuItem组件
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<IMenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // cloneElement将属性混入
        return React.cloneElement(childElement, {
          index: index.toString()
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
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default Menu
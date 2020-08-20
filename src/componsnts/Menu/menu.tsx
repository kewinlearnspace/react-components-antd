import React, { createContext, useState } from 'react';
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
  onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<IMenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props
  const [currentActive, setCurrentActive] = useState(defaultIndex)
  const classes = ClassNames('kewin-menu', className, {
    'menu-vertical': mode === 'vertical'
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
    onSelect: handleClick
  }
  return <ul className={classes} style={style} data-testid="test-menu">
    <MenuContext.Provider value={passedContext}>
      {children}
    </MenuContext.Provider>
  </ul>
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal'
}
export default Menu
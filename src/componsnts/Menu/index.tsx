import { FC } from 'react';
import Menu, { IMenuProps } from './menu';
import SubMenu, { ISubMenuProps } from './subMenu';
import MenuItem, { IMenuItemProps } from './menuItem';

// 交叉类型
export type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>,
  SubMenu: FC<ISubMenuProps>
}

// 类型断言
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
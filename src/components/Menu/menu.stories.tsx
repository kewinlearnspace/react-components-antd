import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const defaultMenu = () => <Menu defaultIndex='0' mode="vertical" onSelect={(index) => { action(index) }} defaultOpenSubMenus={['2']} >
  <MenuItem> cool link</MenuItem>
  <MenuItem disabled> cool link 2</MenuItem>
  <SubMenu title="dropdown">
    <MenuItem> dropdown1</MenuItem>
    <MenuItem> dropdown2</MenuItem>
    <MenuItem> dropdown3</MenuItem>
  </SubMenu>
  <MenuItem> cool link 3</MenuItem>
</Menu>

storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
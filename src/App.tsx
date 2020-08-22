import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './componsnts/Menu/menu';
import MenuItem from './componsnts/Menu/menuItem';
import SubMenu from './componsnts/Menu/subMenu';
import Icon from './componsnts/Icon/icon'

library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="arrow-down" theme="primary" size="10x" />
        <Menu defaultIndex='0' mode="vertical" onSelect={(index) => { alert(index) }} defaultOpenSubMenus={['2']} >
          <MenuItem> cool link</MenuItem>
          <MenuItem disabled> cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem> dropdown1</MenuItem>
            <MenuItem> dropdown2</MenuItem>
            <MenuItem> dropdown3</MenuItem>
          </SubMenu>
          <MenuItem> cool link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;

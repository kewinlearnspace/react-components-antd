import React from 'react';
import Menu from './componsnts/Menu/menu';
import MenuItem from './componsnts/Menu/menuItem';
import SubMenu from './componsnts/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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

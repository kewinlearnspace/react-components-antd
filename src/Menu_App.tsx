import React from 'react';
import Menu from './componsnts/Menu/menu';
import MenuItem from './componsnts/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} mode='vertical' onSelect={(index) => { alert(index) }}>
          <MenuItem> cool link</MenuItem>
          <MenuItem disabled> cool link 2</MenuItem>
          <MenuItem> cool link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;

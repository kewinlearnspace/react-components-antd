import React from 'react';
import Menu from './componsnts/Menu/menu';
import MenuItem from './componsnts/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} mode='vertical' onSelect={(index) => { alert(index) }}>
          <MenuItem index={0}> cool link</MenuItem>
          <MenuItem index={1} disabled> cool link 2</MenuItem>
          <MenuItem index={2}> cool link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
}

export default App;

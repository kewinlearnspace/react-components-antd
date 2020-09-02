import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Transition from './components/Transition/transition'
import Button from './components/Button/button'
library.add(fas)

function App() {
  const [show, setShow] = useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} defaultOpenSubMenus={['2']} >
          <MenuItem> cool link</MenuItem>
          <MenuItem disabled> cool link 2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem> dropdown1</MenuItem>
            <MenuItem> dropdown2</MenuItem>
            <MenuItem> dropdown3</MenuItem>
          </SubMenu>
          <MenuItem> cool link 3</MenuItem>
        </Menu>
        <Button size='lg' onClick={() => { setShow(!show) }} >Toggle </Button>
        <Transition in={show} timeout={300} animation='zoom-in-left'>
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation='zoom-in-left' wrapper>
          <Button btnType='primary' size='lg'>A Large</Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import Button from './components/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={(e) => { e.preventDefault(); alert(123) }} btnType='primary' size='lg'>Primary  Lagre</Button>
        <br />
        <Button className='customer' btnType='danger' size='sm'>Danger small </Button>
        <br />
        <Button btnType='default' size='sm'>Default Small </Button>
        <br />
        <Button disabled> Disabled Button</Button>
        <br />
        <Button btnType='link' href="www.baidu.com" disabled>Disabled Link</Button>
        <br />
        <Button btnType='link' href="www.baidu.com">Baidu Link</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

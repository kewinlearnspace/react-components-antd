import React from 'react';
import Button, { ButtonType, ButtonSize } from './componsnts/Button/button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={(e) => {e.preventDefault(); alert(123)} } btnType={ButtonType.Primary} size={ButtonSize.Large}>Primary  Lagre</Button>
        <br />
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Danger small </Button>
        <br />
        <Button btnType={ButtonType.Default} size={ButtonSize.Small}>Default Small </Button>
        <br />
        <Button disabled> Disabled Button</Button>
        <br />
        <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>Disabled Link</Button>
        <br />
        <Button btnType={ButtonType.Link} href="www.baidu.com">Baidu Link</Button>
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

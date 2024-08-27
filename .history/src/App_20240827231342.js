import React from 'react';
import Home from './components/home';
import GuessNumber from './components/GuessNumber';


function App() {
  return (
    <div className="App">
      <Home />
      <GuessNumber />
      <Analytics />
    </div>
  );
}

export default App;

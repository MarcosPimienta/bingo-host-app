import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <h1>Configurator</h1>
      <p>This is the stand-alone tool. Later it will bundle a Session Package and build the Game app.</p>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
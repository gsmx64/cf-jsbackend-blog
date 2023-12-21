import { useState } from 'react';
import Navbar from './components/Navbar';
import Posts from './components/Posts';
import './App.css'

function App() {
  const [value, setValue] = useState(0)

  setTimeout(()=> {
    setValue(value + 1);
  }, 3000);

  return (
    <>
      {value < 2 ? (
        <div>Cargando...</div>
      ) : (
        <div>
          <Navbar />
          <Posts />
        </div>
      )}
    </>
  )
}

export default App

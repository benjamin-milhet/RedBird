import React , {useEffect}from 'react';
import { Button } from '../component/button';
import './App.css';



function App() {
  useEffect(() => {
    fetch("http://localhost:5000/chargerDonnees")
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

 

  return (
    <div className="App">
    
      <Button content='test' onClick={()=>window.location.href = "http://localhost:3000/connexion"} />
    </div>
  );
}

export default App;

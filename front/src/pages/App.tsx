import React , {useEffect}from 'react';
import { Button } from '../component/button';
import './App.css';
import { Title } from '../component/title';



   
    


  


function App() {
const [slogan, setSlogan] = React.useState("");
useEffect(() => {
 const slogan =  fetch("http://localhost:5000/");
  slogan.then(response => response.json())
  .then(data => {
    
    setSlogan(data);
  })
} ,[]);
 

  useEffect(() => {
    fetch("http://localhost:5000/chargerDonnees")
  
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

 

  return (
    <div className="App">
      
    <header className="App-header">
    <Title  content="Redbird"  />
    
      <p>
   {slogan}yolo
      </p>
      <Button content='Continuer' onClick={()=>window.location.href = "http://localhost:3000/connexion"} />
    </header>
   
    </div>
  );
}

export default App;

import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './connexion.css';
import { hover } from '@testing-library/user-event/dist/hover';



export class Connexion extends React.Component {



    render(): React.ReactNode {
        return (
            <main>
            <div className="connexion"> 
             
                <Title content="Connexion"/>    
                <div className="connexion_div">
                    <form className="connexion_form">
                       
                        <Input label="Nom"/>
                        <Input label="Mot de passe" type="password"/>
                        <Button content="Se connecter" />
                  
                        <div className="goToInscription">
                
                        <a href="./inscription">Pas encore inscrit ? </a>
                        </div>
                    </form>
                    <Button content="Utiliser sans connexion"   className="button_connexion" onClick={()=>alert("test")}/>
                </div>
                

            
            </div>
            
        </main>
        );
    }
}

// Stocker le nom d'utilisateur dans le localStorage lorsque l'utilisateur se connecte
//localStorage.setItem('username', 'nom d\'utilisateur');

// Récupérer le nom d'utilisateur à partir du localStorage lorsque l'application est chargée
//const username = localStorage.getItem('username');
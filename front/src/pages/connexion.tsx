import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './connexion.css';

export class Connexion extends React.Component {
    render(): React.ReactNode {
        return (
            <main>
            <div className="connexion"> 
             
                <Title content="Connexion"/>    
                <div className="connexion_div">
                    <form className="connexion_form">
                        <div className="connexion_components">
                        <Input label="Nom"/>
                        <Input label="mot de passe" type="password"/>
                        <Button content="Se connecter"/>
                        </div>
                        <div className="goToInscription">
                
                        <a href="./inscription">Pas encore inscrit ? </a>
                        </div>
                    </form>
                    
                </div>

               
            </div>
            
        </main>
        );
    }
}
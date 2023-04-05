import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './connexion.css';



export class Connexion extends React.Component {
    state = {
        username: '',
        password: '',
    };

    //fonction pour valider la connexion
    valideConnexion = () => {
        if (this.state.username === '' || this.state.password === '') {
            //affichage d'un message d'erreur si les champs sont vides
            alert('Veuillez remplir tous les champs');
        } else {
           this.handleConnexion();
          
        }
    }

    //fonction pour envoyer les données de connexion au serveur
    handleConnexion = async () => {
        const response = await fetch('http://localhost:5000/connexion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nom: this.state.username,
                password: this.state.password,
            }),
        });

        const data = await response.json();
        
        if (response.status === 200) {
            //stockage du username dans le localStorage
            localStorage.setItem('username', this.state.username);
            //redirection vers la page d'accueil
            window.location.href = 'http://localhost:3000/accueil';
        } else {
            alert(data.message);
        }
    };

    //fonction pour recuperer les données des inputs
    handleInputChange = (event:any) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        
    };

    render(): React.ReactNode {
        return (
            <main>
            <div className="connexion"> 
                <Title content="Connexion"/>    
                <div className="connexion_div">
                    <form className="connexion_form" >  
                        <Input label="Username" name="username" onChange={this.handleInputChange} />
                        <Input label="Password" name="password" onChange={this.handleInputChange} type="password"/>
                        <Button content="Se connecter"  onClick={this.valideConnexion}/>
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

// function  de deconnexion qui supprime le username du localStorage et redirige vers la page de connexion
//utilisé dans la page accueil
export function deconnexion ()  {
    var confirm =window.confirm("Voulez-vous vous déconnecter?");
     if (confirm === true) {
         localStorage.removeItem('username');
         window.location.href = 'http://localhost:3000/connexion'; 
     }
     else {
     }
 }
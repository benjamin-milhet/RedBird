import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './connexion.css';
import { hover } from '@testing-library/user-event/dist/hover';



export class Connexion extends React.Component {
    state = {
        username: '',
        password: '',
    };


    valideConnexion = () => {
        
        if (this.state.username === '' || this.state.password === '') {
            alert('Veuillez remplir tous les champs');
        } else {
            window.location.href = 'http://localhost:3000/accueil';
            localStorage.setItem('username', this.state.username);
           // this.handleConnexion();
        }
    }
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
        alert(data.message);
        if (response.status === 200) {
            //redirection vers la page de accueil
            window.location.href = 'http://localhost:3000/accueil';
            localStorage.setItem('username', this.state.username);

        } else {
            console.log('connexion échouée');
        }
    };
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

export function deconnexion ()  {
    var confirm =window.confirm("Voulez-vous vous déconnecter?");
     if (confirm === true) {
         localStorage.removeItem('username');
         window.location.href = 'http://localhost:3000/'; 
     }
     else {
     }
 }
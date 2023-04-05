import React from "react";
import ReactDOM from "react-dom/client";
import { Title } from "../component/title";
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './inscription.css';


//composant pour afficher la page d'inscription
export class Inscription extends React.Component{
    state = {
        username: "",
        password: "",
    };

    //fonction pour valider l'inscription et envoyer les données au serveur
    handleSignUp = async () => {
        const response = await fetch("http://localhost:5000/inscription", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nom: this.state.username,
                password: this.state.password,
            }),
        });
    
        if (response.status === 200) {
                //redirection vers la page de connexion
                window.location.href = "http://localhost:3000/connexion";
                localStorage.setItem('username', this.state.username);

        } else {
            console.log("inscription échouée");
        }
    };
    
    //fonction pour recuperer les données des inputs
    handleInputChange = (event:any) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        
    };
   
    render(){
        return (
         <main>
            <div className="inscription">
                <Title content="Inscription"/>
                <div className="inscription_div">
                    <form className="form_signup">
                        <Input label="Username" name="username" onChange={this.handleInputChange} />
                       
                        <Input label="Password" name="password" onChange={this.handleInputChange} type="password"/>
                       <Button content="S'inscrire" onClick={this.handleSignUp}/>
                    </form>                        
                </div>
            </div>

        </main>
        );
    }

}

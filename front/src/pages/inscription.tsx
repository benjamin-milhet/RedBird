import React from "react";
import ReactDOM from "react-dom/client";
import { Title } from "../component/title";
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './inscription.css';

export class Inscription extends React.Component{

   
 handleSignUp = () => {
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then((response) => {
            if (response.status === 200) {
                console.log("Inscription réussie");
            } else {
                console.log("Erreur lors de l'inscription");
            }
        });

 }


    render(){
        return (
         <main>
            <div className="inscription">
               
                <Title content="Inscription"/>
                <div className="inscription_div">
                    <form className="form_signup">
                        <Input label="Username"/>
                       
                        <Input label="Password"/>
                       <Button content="S'inscrire" onClick={this.handleSignUp}/>
                    </form>                        
                </div>
            </div>

        </main>
        );
    }

}

import React from "react";
import ReactDOM from "react-dom/client";
import { Title } from "../component/title";
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import './inscription.css';

export class Inscription extends React.Component{


    render(){
        return (
         <main>
            <div className="inscription">
               
                <Title content="Inscription"/>
                <div className="inscription_div">
                    <form className="form_signup">
                        <Input label="Username"/>
                       
                        <Input label="Mail"/>
                       
                        <Button content="Envoyer"/>
                    </form>                        
                </div>
            </div>

        </main>
        );
    }

}

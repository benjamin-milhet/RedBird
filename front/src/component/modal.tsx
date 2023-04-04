// Modal.tsx

import React, { ReactNode, useState, useEffect } from "react";
import "./modal.css";
import { tweet } from "../component/tweet";
import { Input } from '../component/form/input';
import { Button } from '../component/button';

interface ModalType {
  children?: ReactNode;
 
  close: () => void;
  
  
}

  
export class Modal extends React.Component<ModalType> {


  state = {  
    tweet: "",
  };


   postNewTweet = async  (): Promise<boolean> => {
    
    
    if (this.state.tweet === "") {
      return false;
    }
  


    try {
      const response = await fetch("http://localhost:5000/tweeter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          nom: localStorage.getItem('username'),
          tweet: this.state.tweet,
        }),
        
      });
      
      this.props.close();
      return response.ok;
      
    
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  
  



  render(): React.ReactNode {
      
  
  return (
  
        <div className="modal-overlay" onClick={this.props.close}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {this.props.children}
            <div className="modal">
            <button className="close" onClick={this.props.close} >
              X
            </button>
           <text className="title">Tweeter</text>
         
            
           
            <textarea className="input"
              name="tweet"
              onChange={(e) => this.setState({ tweet: e.target.value })}
              placeholder="Votre tweet"
            />

          
          Vous écrivez sous le nom de : {localStorage.getItem('username')}
            

            <Button content="Envoyer" onClick={ this.postNewTweet} />
            
          </div>
          </div>
        </div>
      
    
  );
}
}
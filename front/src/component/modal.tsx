// Modal.tsx

import React, { ReactNode, useState, useEffect } from "react";
import "./modal.css";
import { tweet } from "../component/tweet";
import { Input } from '../component/form/input';
import { Button } from '../component/button';

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  
  
}

  
export default function Modal(props: ModalType) {


  const [tweet, setTweet] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  //verifier si l'utilisateur est connecté avec le localStorage
  
  

 


  async function postNewTweet(): Promise<boolean> {
    
    
    if (tweet === "") {
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
          tweet: tweet,
        }),
        
      });
      console.log(response.ok);
      props.close();
      return response.ok;
      
    
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  const disconnect = () => {
    localStorage.removeItem('username');
    setIsConnected(false);
  }
  
  



  
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.close}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
            <div className="modal">
            <button className="close" onClick={props.close} >
              X
            </button>
           <text className="title">Tweet</text>
         
            
           
            <textarea className="input"
              name="tweet"
              onChange={(e) => setTweet(e.target.value)}
              placeholder="Votre tweet"
            />

          
          Vous écrivez sous le nom de : {localStorage.getItem('username')}
            

            <Button content="Envoyer" onClick={ postNewTweet} />
            
          </div>
          </div>
        </div>
      )}
    </>
  );
}

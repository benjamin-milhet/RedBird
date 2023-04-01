// Modal.tsx

import React, { ReactNode } from "react";
import "./modal.css";
import { tweet } from "../component/tweet";
import { Input } from '../component/form/input';
import { Button } from '../component/button';
interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  close: () => void;
  
}
async function postNewTweet(username: string, text: string): Promise<boolean> {

    try {
      const response = await fetch("http://localhost:5000/tweeter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          nom: username,
          tweet: text,
        }),
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
export default function Modal(props: ModalType) {
  const [username, setUsername] = React.useState("");
  const [text, setText] = React.useState("");



  
      
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.close}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            {props.children}
            <Button content="Fermer" onClick={props.close} />

            <Button content="Envoyer" onClick={() => postNewTweet(username, text)} />

          </div>
        </div>
      )}
    </>
  );
}

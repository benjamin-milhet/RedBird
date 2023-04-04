import React, { ReactNode, useState, useEffect } from "react";
import "./modal.css";
import { tweet } from "../component/tweet";

import { Button } from '../component/button';
import {topic} from "../component/topic";
import SearchBar from "./searchBar";
import "./userFinder.css";
import "../pages/accueil.css";

interface userFinder {
  children?: ReactNode;
 
  close: () => void;
  
  
}

let searchUser: string = "";

export class UserFinder extends React.Component<userFinder> {


    state = {  
      
      listUser: [],
     listUserSearch: [],
     
    };
  
    
    
    async componentDidMount() {
        const response = await fetch("http://localhost:5000/getAllUsers");
        const data = await response.json();
        this.setState({ listUser: data });
        console.log(data);
        this.setState({ listUserSearch: data });
    }
  searchUser = (value: string) => {
    searchUser= value;
      
      console.log(this.state.listUser);
      console.log(this.state.listUserSearch);
      const filteredUsers = this.state.listUser.filter((user: string) =>
      user.toLowerCase().startsWith(searchUser.toLowerCase())
    );
        this.setState({ listUserSearch: filteredUsers});
        if (value === "") {this.reset();}
  }
  handleKeyDown = (key:string) => {
        if (key === "Backspace") {
            searchUser = searchUser.slice(0, -1);
                this.searchUser(searchUser);
        }
    }

         
  reset = () => {
    this.setState({ listUserSearch: this.state.listUser });
    searchUser = "";
    }
  
    render(): React.ReactNode {
        
    
    return (
    
          <div className="modal-overlay" onClick={this.props.close}>
            <div onClick={(e) => e.stopPropagation()} className="box">
              {this.props.children}
              <div className="modal">
              <button className="close" onClick={this.props.close} >
                X
              </button>
            <div className="users">
             <text className="title">Users</text>

             <div className="liste_topics">
             <SearchBar    
                             onChange={(e)=> this.searchUser(e.target.value)}
                            onReset={ ()=> this.reset()} 
                            onKeyDown={(e)=> this.handleKeyDown(e.key)}
                            holder='Rechercher un sujet'
                        />
             {this.state.listUserSearch.map((user) => (
                        <div className="topic">
                        <text >{user }</text>
                        
                        </div>

                    ))}
           
              
             </div>
             </div>
             
              
  
            
        
  
              
            </div>
            </div>
          </div>
        
      
    );
  }
  }
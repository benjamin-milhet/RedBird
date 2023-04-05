import React, { ReactNode, useState, useEffect } from "react";
import "./modal.css";
import { tweet } from "../component/tweet";

import { Button } from '../component/button';

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
  
  //fonction pour récupérer la liste des users appelée au chargement de la page
  async componentDidMount() {
      const response = await fetch("http://localhost:5000/getAllUsers");
      const data = await response.json();
      this.setState({ listUser: data });
      console.log(data);
      this.setState({ listUserSearch: data });
  }

  //fonction pour rechercher un user
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

  //fonction pour supprimer le dernier caractère de la recherche
  handleKeyDown = (key:string) => {
    if (key === "Backspace") {
        searchUser = searchUser.slice(0, -1);
            this.searchUser(searchUser);
    }
  }
 
  //fonction pour réinitialiser la recherche
  reset = () => {
  this.setState({ listUserSearch: this.state.listUser });
  searchUser = "";
  }
  
  //fonction pour afficher la page de l'utilisateur sélectionné
  seeUserTweets = (user: string) => {
      window.location.href = "/user/" + user;
  }

  render(): React.ReactNode {
    return (
    
          <div className="modal-overlay" onClick={this.props.close}>
            <div onClick={(e) => e.stopPropagation()} className="box"> {this.props.children}
                <div className="modal">
                    <button className="close" onClick={this.props.close} >
                        X
                    </button>
                    <div className="users">
                        <text className="title">Users</text>
                        <SearchBar    
                            onChange={(e)=> this.searchUser(e.target.value)}
                            onReset={ ()=> this.reset()} 
                            onKeyDown={(e)=> this.handleKeyDown(e.key)}
                            holder='Rechercher un sujet'
                        />
                        <div className="liste_topics">
                        {this.state.listUserSearch.map((user) => (
                            <div className="user" onClick={()=>this.seeUserTweets(user)}>
                                <text >{user }</text>
                                <img className="eye" src='./images/icon-eil.png'  />
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
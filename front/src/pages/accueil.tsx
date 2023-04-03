import React ,{useState} from 'react';

import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet ,sortTweetByMoreRecentId} from '../component/tweet';
import { Retweet, retweet } from '../component/retweet';
import  Modal  from '../component/modal';
import './accueil.css';
import { MyForm, options} from '../component/form/forms';
import { deconnexion } from './connexion';

interface props {
    //liste de tweets
    listOfTweets: tweet[];
    isOpen: boolean;
    listOfTopics: string[];
    searchValue: string;
    selectedOption: string;
  
}


export class Accueil extends React.Component< any,props>{
    constructor(props: any) {
        super(props);
        this.state = {    
           //tableau de tweets
            listOfTweets: [],
            isOpen: false,
          listOfTopics: [],
            searchValue: "",
            selectedOption: "user",
           
            

           
        };
    }

    
   






    async componentDidMount(){
        this.getAllTweet();
        this.getAllSujet();   
    }

    
    
       

    closeModal = () => {
        this.setState({ isOpen: false });
        this.componentDidMount();
        };
    openModal = () => {
        this.setState({ isOpen: true });
    };

    getAllSujet = async () => {
        const response2 = await fetch("http://localhost:5000/getAllSujet");
        const topics = await response2.json();
        this.setState({listOfTopics:topics})
        
    };

    getAllTweet  = async () => {
        const response = await fetch("http://localhost:5000/getAllTweets");
        const tweets = await response.json();
        console.log(tweets);
        const listOfTweets = tweets.map((tweet: any) => {
            return {
                id: tweet.id,
                username: tweet.nom,
                text: tweet.tweet,
                
            };
        });
        this.setState({ listOfTweets: sortTweetByMoreRecentId(listOfTweets) });
        this.setState({ searchValue: "" })
    };

        
    getAllTweetByTopic = async (topic: string) => {
        const response = await fetch("http://localhost:5000/getAllTweetsBySujet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sujet: topic,
            }),
        });
        const tweets = await response.json();
        const listOfTweets = tweets.map((tweet: any) => {
            return {
                id: tweet.id,
                username: tweet.nom,
                text: tweet.tweet,
            };
        });
        this.setState({ listOfTweets: sortTweetByMoreRecentId(listOfTweets) });
        this.setState({ searchValue: topic })
    };
    handleValueChange  = (value: string)  => {
       
        this.setState({selectedOption: value});
        
    };

    search = (event: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({ searchValue: event.currentTarget.value });

             
        switch (this.state.selectedOption) {
            case "user":
                //this.getAllTweetByUser(event.target.value);
                break;
            case "topic":
            
                
              const filteredTopics = this.state.listOfTopics.filter((topic) =>
            topic.toLowerCase().includes(this.state.searchValue.toLowerCase())
        );
        this.setState({ listOfTopics: filteredTopics });
               
                break;
            case "text":

            
            
            const filteredTweets = this.state.listOfTweets.filter((tweet) =>
                tweet.text.toLowerCase().includes(this.state.searchValue.toLowerCase())
            );
            this.setState({ listOfTweets: filteredTweets });
            

                break;
            default:
                break;

        }
        if (event.target.value === "") {
        this.getAllTweet();
    }

        
    }




    
    reset = () => {
        this.setState({ searchValue: "" });
        this.getAllTweet();
        this.getAllSujet();

    };

     


    
 render(){   
//console.log(localStorage.getItem('username'));



        return (
            <main>
                <div className="accueil">
               
                
                <div className="top">

                    <div className="center">
                    <Title content="Tweeterrr" />
                    </div>
                   
                    
                    <Button className = "deconnexion_btn" content="Déconnexion" onClick={deconnexion} />
                    
                </div>    

                    <Button className = "newTweetBtn" content="+" style={{   width: 40,height: 40}} onClick={this.openModal} /> 
                    <div className="magic_bar">
                        <SearchBar    
                             onChange={( this.search)}
                            onReset={ ()=> this.reset()} //fonction de reset
                            value={this.state.searchValue}
                        />
                         <MyForm getValue={this.handleValueChange} options={options} />
                    </div>
                
                <div className = "body">

                   <div className="tweets">
                        {this.state.listOfTweets.map((tweet) => (
                            <Tweet
                            id={tweet.id}
                            username={tweet.username}
                            text={tweet.text}

                            
                            />
                        ))}
                    </div>

                    <div className="topics">
                    <text className="title_topics">Topics</text>
                    <div className="liste_topics">
                    {this.state.listOfTopics.map((topic) => (
                        <div className="topic">
                        <text >{topic }</text>
                        <img className="topic_btn" src='../images/icon-eil.png' onClick={()=> this.getAllTweetByTopic(topic)}/>

                        </div>

                    ))}
                    </div>
                    </div>
                </div>
                </div>
                <Modal isOpen={this.state.isOpen} close={this.closeModal} ></Modal>
            </main>
        );
    }
}

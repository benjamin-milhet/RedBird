import React ,{useState} from 'react';

import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet ,sortTweetByMoreRecentId} from '../component/tweet';
import { Retweet, retweet } from '../component/retweet';
import  Modal  from '../component/modal';
import './accueil.css';
import { MyForm} from '../component/form/forms';
import { deconnexion } from './connexion';

interface props {
    //liste de tweets
    listOfTweets: tweet[];
    isOpen: boolean;
    listOfTopics: string[];
    searchTopic: string;
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
            searchTopic: "",
            selectedOption: "option1",
            

           
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
        this.setState({ searchTopic: "" })
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
        this.setState({ searchTopic: topic })
    };
    handleValueChange = (value: string) => {
        this.setState({selectedOption: value});
    };


    
      options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
      ];


    
 render(){   
console.log(localStorage.getItem('username'));
const filteredTopics = this.state.listOfTopics.filter((topic) =>
            topic.toLowerCase().includes(this.state.searchTopic.toLowerCase())
        );
       

        return (
            <main>
                <div className="accueil">
                <MyForm getValue={this.handleValueChange} options={this.options} />
                <div className="top">

                    <Title content="RedBird" />
                    <Button className = "deconnexionBtn" content="Déconnexion" onClick={this.confirm} />

                    <Button className = "newTweetBtn" content="+" style={{   width: 40,height: 40}} onClick={this.openModal} /> 
                  
                    <SearchBar  onSearch={(query: string) => console.log(query)} />   
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
                    <form className="searchBar" >
                        <input className="searchBar_input"
                            type="text"
                            
                            onChange={(event) => this.setState({searchTopic :event.target.value})}
                            placeholder="Search..."
                            value={this.state.searchTopic}
                        />
                        <button type="reset" className="reset_search" 
                            onClick={ ()=> this.getAllTweet()} //fonction pour reset 
                             >
                            X
                        </button>
                    </form>
      
                    <div className="liste_topics">
                    {filteredTopics.map((topic) => (
                        <div className="topic">
                        <text >{topic }</text>
                        <button className="topic_btn"  onClick={()=> this.getAllTweetByTopic(topic)}>Voir</button>
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
import React ,{useState} from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet} from '../component/tweet';
import { Retweet, retweet } from '../component/retweet';
import  Modal  from '../component/modal';
import './accueil.css';


interface props {
    //liste de tweets
    listOfTweets: tweet[];
    isOpen: boolean;
    listOfTopics: string[];
    searchTopic: string;
    
    
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
            

           
        };
    }

    
   
 sortTweetByMoreRecentId =(liste:tweet[]) => {
    return liste.sort((a, b) => {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    });
    }


 confirm = () => {
   var confirm =window.confirm("Voulez-vous vous déconnecter?");
    if (confirm === true) {
        localStorage.removeItem('username');
        window.location.href = 'http://localhost:3000/'; 
    }
    else {
    }
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
        this.setState({ listOfTweets: this.sortTweetByMoreRecentId(listOfTweets) });
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
        this.setState({ listOfTweets: this.sortTweetByMoreRecentId(listOfTweets) });
        this.setState({ searchTopic: topic })
    };


    
 render(){   
console.log(localStorage.getItem('username'));
const filteredTopics = this.state.listOfTopics.filter((topic) =>
            topic.toLowerCase().includes(this.state.searchTopic.toLowerCase())
        );
       

        return (
            <main>
               
                <div className="accueil">
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
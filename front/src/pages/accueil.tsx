import React ,{useState} from 'react';

import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet ,sortTweetByMoreRecentId} from '../component/tweet';
import { Modal}  from '../component/modal';
import './accueil.css';
import { MyForm, options} from '../component/form/forms';
import { deconnexion } from './connexion';
import { topic } from '../component/topic';
import { UserFinder } from '../component/userFinder';

interface props {
    //liste de tweets
    listOfTweets: tweet[];
    tweetFormIsOpen: boolean;
    listOfTopics: string[];
    listOfUserTweets: tweet[];
    filterTweets: tweet[];
    filterTopics: string[];
    userFinderisopen: boolean;
}

let searchContent:string = "";
let searchTopic: string = "";

export class Accueil extends React.Component< any,props>{
    constructor(props: any) {
        super(props);
        this.state = {    
            listOfTweets: [],
            tweetFormIsOpen: false,
            userFinderisopen: false,
            listOfTopics: [],
            listOfUserTweets: [],
            filterTopics: [],
            filterTweets: [],
        };
    }
   
    retweeter = async (idTweet: number, usernameTweet: string): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:5000/retweet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    nom: localStorage.getItem('username'),
                    nom_user_tweet: usernameTweet,
                    id: idTweet,
                }),
                
            });
            const data = await response.json();
            console.log(data.message);
                this.getAllTweet();
            return response.ok;

          } catch (error) {
            console.error(error);
            return false;
          }
    }
      
    async componentDidMount(){
        this.getAllTweet();
        this.getAllSujet();   
    }

    getAllSujet = async () => {
        const response = await fetch("http://localhost:5000/getAllSujet");
        const topics = await response.json();
        this.setState({listOfTopics:topics})
        this.setState({filterTopics:topics})
    };

    getAllTweet  = async () => {
        const response = await fetch("http://localhost:5000/getAllTweets");
        const tweets = await response.json();
        const listOfTweets = tweets.map((tweet: any) => {
            return {
                id: tweet.id,
                username: tweet.nom,
                retweeter: tweet.retweet_user,
                text: tweet.tweet,
                
            };
        });
        console.log(listOfTweets);
        this.setState({ listOfTweets: sortTweetByMoreRecentId(listOfTweets) });
       searchContent = "";
       this.setState({filterTweets: sortTweetByMoreRecentId(listOfTweets)});
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
                retweeter: tweet.retweet_user,
                text: tweet.tweet,
            };
        });
        this.setState({ filterTweets: sortTweetByMoreRecentId(listOfTweets) });
      
    };

    searchContent =  (value:string) =>{
        const filteredTweets = this.state.listOfTweets.filter((tweet:tweet) =>
            tweet.text.toLowerCase().includes(value.toLowerCase())
        );
        this.setState({ filterTweets: filteredTweets });
        const filteredTopics = this.state.listOfTopics.filter((topic: string) =>
            filteredTweets.some((tweet) => tweet.text.toLowerCase().includes(topic.toLowerCase()))
        );
        this.setState({ filterTopics: filteredTopics });
        if (value === "") { this.reset(); }
        
    }

    handleKeyDown = (key:string,type:string) => {
        if (key === "Backspace") {
            if (type === "topic") {
                searchTopic = searchTopic.slice(0, -1);
                this.searchTopic(searchTopic);
            } else if (type === "content") {  
                searchContent = searchContent.slice(0, -1);
                this.searchContent(searchContent);
            }
        }
    };
    
    searchTopic = (value:string) =>{
       
        searchTopic = value;
      
        const filteredTopics = this.state.listOfTopics.filter((topic:string) =>
            topic.toLowerCase().startsWith(searchTopic.toLowerCase())
        );
        this.setState({ filterTopics: filteredTopics });
        if (value === "") {this.reset();}
    }


    
    reset = () => {
        searchContent = "";
        searchTopic = "";
        //reset les tweetfiltrés avec les tweets de base
        this.setState({ filterTweets: this.state.listOfTweets });
        //reset les topics filtrés avec les topics de base
        this.setState({ filterTopics: this.state.listOfTopics });

    };

 render(){   
        return (
            <main>
                <div className="accueil">
                    <div className="top">
                        <div className='left'></div>
                        <div className="center">
                            <Title content="RedBird" />
                        </div>
                        <Button className = "deconnexion_btn" content="Déconnexion" onClick={deconnexion} />
                    </div>    
                    <Button className = "newTweetBtn" content="Poster"  onClick={()=> this.setState({ tweetFormIsOpen: !this.state.tweetFormIsOpen} )} /> 
                    <Button className = "find-user-btn" content="Trouver un utilisateur"   onClick={()=> this.setState({ userFinderisopen: !this.state.userFinderisopen} )} /> 
                    <div className="big-searchBar">
                        <SearchBar    
                            onChange={(e)=> this.searchContent(e.target.value)}
                            onReset={ ()=> this.reset()}
                            onKeyDown={(e)=> this.handleKeyDown(e.key, "content")} 
                            holder='Rechercher un tweet'
                        />
                    </div>
                    <div className = "body">
                        <div className="tweets">
                            {this.state.filterTweets.map((tweet) => (
                                <div>
                                <Tweet
                                id={tweet.id}
                                username={tweet.username}
                                retweeter={tweet.retweeter}
                                text={tweet.text}
                                onclick={()=> this.retweeter(tweet.id, tweet.username)}
                                
                                />
                            
                            </div>
                            ))}
                        </div>
                        <div className="topics">
                            <text className="title_topics">Sujets</text>
                            <SearchBar    
                                    onChange={(e)=> this.searchTopic(e.target.value)}
                                    onReset={ ()=> this.reset()} 
                                    onKeyDown={(e)=> this.handleKeyDown(e.key, "topic")}
                                    value={searchTopic}
                                    holder='Rechercher un sujet'
                                />
                            <div className="liste_topics">
                                {this.state.filterTopics.map((topic) => (
                                    <div className="topic" 
                                    onClick={()=> {this.getAllTweetByTopic(topic); this.searchTopic(topic)}}>
                                        <text >{topic }</text>
                                        <img className="topic_btn" src='./images/icon-eil.png' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tweetFormIsOpen && <Modal  
                close={()=> {this.setState({ tweetFormIsOpen: false } ) ;
                this.componentDidMount()}} ></Modal>
                }
                {this.state.userFinderisopen && <UserFinder
                close={()=> {this.setState({ userFinderisopen: false })}} ></UserFinder>
                }
            </main>
        );
    }
}

import React  from 'react';
import { Title } from '../component/title';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet ,sortTweetByMoreRecentId} from '../component/tweet';
import { Modal}  from '../component/modal';
import './accueil.css';
import { deconnexion } from './connexion';
import { UserFinder } from '../component/userFinder';


interface props {
    listOfTweets: tweet[];
    tweetFormIsOpen: boolean;
    listOfTopics: string[];
    listOfUserTweets: tweet[];
    filterTweets: tweet[];
    filterTopics: string[];
    userFinderisopen: boolean;
}

//variables pour stocker le contenu de la recherche
let searchContent:string = "";
let searchTopic: string = "";

//composant pour afficher la page d'accueil
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
   
    //fonction pour récupérer la liste des tweets et des sujet au chargement de la page
    async componentDidMount(){
        this.getAllTweet();
        this.getAllSujet();   
    }

    //fonction pour retweeter un tweet 
    retweeter = async (idTweet: number, usernameTweet: string): Promise<boolean> => {
        try {
            const response = await fetch("http://localhost:5000/retweet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    //on envoie le nom de l'utilisateur qui retweet et le nom de l'utilisateur qui a tweeté
                    nom: localStorage.getItem('username'),
                    nom_user_tweet: usernameTweet,
                    id: idTweet,
                }),
                
            });
            const data = await response.json();
            if (response.status === 200) {
                alert("Retweet effectué");
            }
            else {
                alert(data.message);
            }
            this.getAllTweet();
            return response.ok;

          } catch (error) {
            console.error(error, "error");
            return false;
          }
    }
      
    //fonction pour récupérer tous les sujets
    getAllSujet = async () => {
        const response = await fetch("http://localhost:5000/getAllSujet");
        const topics = await response.json();
        this.setState({listOfTopics:topics})
        this.setState({filterTopics:topics})
    };

    //fonction pour récupérer tous les tweets
    getAllTweet  = async () => {
        const response = await fetch("http://localhost:5000/getAllTweets");
        const tweets = await response.json();
        const listOfTweets = tweets.map((tweet: any) => {
            return {
                //on récupère les informations du tweet et on les met dans un objet de type tweet
                id: tweet.id,
                username: tweet.nom,
                retweeter: tweet.retweet_user,
                text: tweet.tweet,
                
            };
        });
        console.log(listOfTweets);
        //on met à jour la liste des tweets
        this.setState({ listOfTweets: sortTweetByMoreRecentId(listOfTweets) });
        //on met à jour la liste des tweets filtrés
        this.setState({filterTweets: sortTweetByMoreRecentId(listOfTweets)});
        //on remet à zéro la recherche
        searchContent = "";
    };
    
    //fonction pour récupérer tous les tweets par sujet
    getAllTweetByTopic = async (topic: string) => {
        const response = await fetch("http://localhost:5000/getAllTweetsBySujet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                //on envoie le sujet
                sujet: topic,
            }),
        });
        const tweets = await response.json();
        //on récupère les tweets qui contiennent le topic recherché
        const listOfTweets = tweets.map((tweet: any) => {
            return {//on récupère les informations du tweet et on les met dans un objet de type tweet
                id: tweet.id,
                username: tweet.nom,
                retweeter: tweet.retweet_user,
                text: tweet.tweet,
            };
        });
        this.setState({ filterTweets: sortTweetByMoreRecentId(listOfTweets) });
    };

    //fonction qui permet de rechercher du contenu dans les tweets
    searchContent =  (value:string) =>{
        //on récupère les tweets qui contiennent le contenu recherché
        const filteredTweets = this.state.listOfTweets.filter((tweet:tweet) =>
        //on vérifie que le contenu  est dans le tweet
            tweet.text.toLowerCase().includes(value.toLowerCase())
        );
        //on récupère les tweets qui contiennent le contenu recherché
        this.setState({ filterTweets: filteredTweets });
        //on récupère les topics qui sont dans les tweets filtrés
        const filteredTopics = this.state.listOfTopics.filter((topic: string) =>
            filteredTweets.some((tweet) => tweet.text.toLowerCase().includes(topic.toLowerCase()))
        );
        //on met à jour la liste des topics filtrés
        this.setState({ filterTopics: filteredTopics });
        if (value === "") { this.reset(); }
    }

    //fonction qui permet de rechercher un sujet
    searchTopic = (value:string) =>{
        searchTopic = value;
        //on récupère les tweets qui contiennent le sujet recherché
        const filteredTopics = this.state.listOfTopics.filter((topic:string) =>
        //on vérifie que le sujet commence par la recherche
            topic.toLowerCase().startsWith(searchTopic.toLowerCase())
        );
        //on récupère les tweets qui contiennent le sujet recherché
        //et on les met dans la liste des tweets filtrés
        this.setState({ filterTopics: filteredTopics });
        if (value === "") {this.reset();}
    }

    //fonction qui permet de detecter les touches du clavier
    handleKeyDown = (key:string,type:string) => {
        //si la touche backspace est pressée (effacer le dernier caractère)
        if (key === "Backspace") {
            //si on est dans la barre de recherche de topic
            if (type === "topic") {
                //on enlève le dernier caractère de la recherche
                searchTopic = searchTopic.slice(0, -1);
                //et on relance la recherche
                this.searchTopic(searchTopic);
            } else if (type === "content") {  
                searchContent = searchContent.slice(0, -1);
                this.searchContent(searchContent);
            }
        }
    };

    //fonction qui permet de reset les filtres
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
                    <div className='top'>
                    <div className="head">
                        <div className='left'></div>
                        <div className="center">
                        <img className="logo" src='./images/logo-redbird.png'  />
                            <Title content="RedBird" />
                        </div>
                        <Button className = "deconnexion_btn" content="Déconnexion" onClick={deconnexion} />
                    </div>    
                    <Button className = "newTweetBtn" content="Poster" 
                    //bouton pour poster un tweet qui ouvre le modal avec le formulaire de tweet
                     onClick={()=> this.setState({ tweetFormIsOpen: !this.state.tweetFormIsOpen} )} /> 

                    <Button className = "find-user-btn" content="Trouver un utilisateur"  
                    //bouton pour trouver un utilisateur qui ouvre le modal avec le formulaire de recherche d'utilisateur
                     onClick={()=> this.setState({ userFinderisopen: !this.state.userFinderisopen} )} /> 
                    <div className="big-searchBar">
                        <SearchBar  //barre de recherche de contenu  
                            onChange={(e)=> this.searchContent(e.target.value)}
                            onReset={ ()=> this.reset()}
                            onKeyDown={(e)=> this.handleKeyDown(e.key, "content")} 
                            holder='Rechercher un tweet'
                        />
                    </div>
                    </div>
                    <div className = "body">

                        <div className="tweets">
                            {this.state.filterTweets.map((tweet) => (
                                // className='special' pour pouvoir cliquer sur un sujet
                                <div className='special'> 
                                <Tweet
                                id={tweet.id}
                                username={tweet.username}
                                retweeter={tweet.retweeter}
                                text={tweet.text}
                                onclick={()=> this.retweeter(tweet.id, tweet.username)}
                                clickOnTag={(tag)=> this.searchTopic(tag)} //on passe la fonction qui permet de rechercher un topic
                                />
                                </div>
                            ))}
                        </div>

                        <div className="topics">
                            <text className="title_topics">Sujets</text>
                            <SearchBar   //barre de recherche de sujet
                                    onChange={(e)=> this.searchTopic(e.target.value)}
                                    onReset={ ()=> this.reset()} 
                                    onKeyDown={(e)=> this.handleKeyDown(e.key, "topic")}
                                    value={searchTopic}
                                    holder='Rechercher un sujet'
                                />
                            <div className="liste_topics">
                                {this.state.filterTopics.map((topic) => ( //on affiche les sujets filtrés
                                    <div className="topic" 
                                    onClick={()=> {this.getAllTweetByTopic(topic); this.searchTopic(topic)}}>
                                        <text >{topic }</text>
                                        <img className="topic_btn" src='./images/icon-eil.png' // bouton pour rechercher les tweets associés au sujet
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tweetFormIsOpen && <Modal  //modal pour poster un tweet qui s'affiche que si la variable est à true
                close={()=> {this.setState({ tweetFormIsOpen: false } ) ;
                this.componentDidMount()}} ></Modal>
                }
                {this.state.userFinderisopen && <UserFinder //modal pour rechercher un utilisateur qui ne s'affiche que si la variable est à true
                close={()=> {this.setState({ userFinderisopen: false })}} ></UserFinder>
                }
            </main>
        );
    }
}

 
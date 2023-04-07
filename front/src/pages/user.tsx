import React from "react";
import { Tweet, tweet , sortTweetByMoreRecentId} from "../component/tweet";
import { Title } from "../component/title";
import { Button } from "../component/button";
import "./user.css"
import { retweeter } from "./accueil";


interface props {
    listOfUserTweets: tweet[];
   
  
}

//recuperation du nom x de l'utilisateur dans l'url
let name=window.location.pathname.split("/")[2]; 

//composant pour afficher la page de l'utilisateur x
export class User extends React.Component<any,props> {
    constructor(props: any) {
        super(props);
        this.state = {
        listOfUserTweets: [],  
        };
    }

    //recuperation les tweets de l'utilisateur au chargement de la page
    async componentDidMount() {
    this.getAllTweetByUser(name);
    }

    //fonction pour recuperer les tweets de l'utilisateur
    getAllTweetByUser = async (username: string) => {
        const response = await fetch("http://localhost:5000/getAllTweetsByUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nom: username,
            }),
        });
        
        const tweets = await response.json();
        
       //mapping des tweets pour les afficher
        const listOfUserTweets = tweets.map((tweet: any) => {
            return {
                id: tweet.id,
                username: tweet.nom,
                retweeter: tweet.retweet_user,
                text: tweet.tweet,
            };
            
        });
        this.setState({ listOfUserTweets: sortTweetByMoreRecentId(listOfUserTweets) });
    };
  
    render(): React.ReactNode {
        return (
            <main>
                <div className="u-top">
                    <Button className = "retour-btn" content="Retour" onClick={()=> window.location.href = "http://localhost:3000/accueil"} />
                    <div className="center">
                        <Title content={"Tweets de "+ name} />
                    </div>
                    <div className='right'></div>
                </div>
                <div className="u-body">
                    <div className="u-tweets">
                        {this.state.listOfUserTweets.map((tweet: tweet) => (
                            <Tweet
                                id={tweet.id}
                                username={tweet.username}
                                retweeter={tweet.retweeter}
                                text={tweet.text}
                                onclick={() => {retweeter(tweet.id, tweet.username); this.getAllTweetByUser(name);}}
                                
                                
                            />
                        ))}
                    </div>
                </div>
            </main>
        );
    }
    }
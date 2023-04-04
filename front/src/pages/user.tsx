import React from "react";
import { Tweet, tweet , sortTweetByMoreRecentId} from "../component/tweet";
import { Title } from "../component/title";
import { Button } from "../component/button";
import "./user.css"


interface props {
    listOfUserTweets: tweet[];
   
  
}

let name=window.location.pathname.split("/")[2];
export class User extends React.Component<any,props> {
    constructor(props: any) {
        super(props);
        this.state = {
            listOfUserTweets: [],
           
        };
    }
    async componentDidMount() {
        
    this.getAllTweetByUser(name);
        
    }
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
        console.log(tweets);

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
            <div className="top">
            
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
               
            
            />
            ))}
            </div>
            </div>
            </main>
        );
    }
    }
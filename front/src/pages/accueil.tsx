import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet} from '../component/tweet';
import { Retweet,retweet } from '../component/retweet';

import { useState } from 'react';



const  tweetTest: tweet = {
    id: 1,
    username: "John Doe",
    text: "Hello World",
    
 
};

const listeTweets: tweet[] = [tweetTest, {
    id: 2,
    username: "John Doe",
    text: "Hello World #react yolo #javascript",
   
 
}];





    const tags = ["#react", "#typescript", "#javascript"];
 
    const [tweets, setTweets] = useState<tweet[]>(listeTweets);
export class Accueil extends React.Component{

 
    loafTweets = () => {
        fetch("http://localhost:5000/getAllTweets")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setTweets(data);
        });
        
    };
   






 render(){
    this.loafTweets();
    console.log(tweets);
        return (


            <main>
                <div className="accueil">
                    <Title content="Tweeterrr" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}}  /> 
                  
                    <SearchBar onSearch={(query: string) => console.log(query)} />   
                   <div className="tweets">
                        {listeTweets.map((tweet) => (
                            <Tweet
                            id={tweet.id}
                            username={tweet.username}
                            text={tweet.text}
                            
                            
                            />
                        ))}
                    </div>
                    <Retweet id={1}
                    nameRetweeter="Jean michel"
                    retweet={tweetTest}
                    
                    />
                   </div>
            </main>
        );
    }
}
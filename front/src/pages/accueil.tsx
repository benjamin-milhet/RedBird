import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet} from '../component/tweet';

const replies = [
    {
      username: "JaneDoe",
      text: "This is a reply!",
      date: new Date(),
    },
    {
      username: "BobSmith",
      text: "This is another reply!",
      date: new Date(),
    },
  ];

const reponse1: tweet = {
    username: "BobSmith",
    text: "This is another reply!",
    date: new Date(),
};
const reponse2: tweet = {
    username: "JaneDoe",
    text: "This is a reply!",
    date: new Date(),
};

const  tweetTest: tweet = {
    username: "John Doe",
    text: "Hello World",
    date: new Date(),
    tags: ["#react", "#typescript", "#javascript"],
    replies: [
       reponse1,reponse2
    ],      
};

const listeTweets: tweet[] = [tweetTest, {
    username: "John Doe",
    text: "Hello World",
    date: new Date(),
    tags: ["#react", "#javascript"],
}];





    const tags = ["#react", "#typescript", "#javascript"];
 


export class Accueil extends React.Component{

    loadTweets(){
        fetch('http://localhost:3000/tweets')
        .then((response) => {
            if (response.status === 200) {
                console.log("Tweets chargés");
            } else {
                console.log("Erreur lors du chargement des tweets");
            }
        });
    }


 render(){
        return (
            <main>
                <div className="accueil">
                    <Title content="Tweeterrr" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}}  /> 
                  
                    <SearchBar onSearch={(query: string) => console.log(query)} />   
                   <div className="tweets">
                        {listeTweets.map((tweet) => (
                            <Tweet
                            username={tweet.username}
                            text={tweet.text}
                            date={tweet.date}
                            tags={tweet.tags}
                            replies={tweet.replies}
                            />
                        ))}
                    </div>

                   </div>
            </main>
        );
    }
}
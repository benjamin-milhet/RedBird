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
     
    },
    {
      username: "BobSmith",
      text: "This is another reply!",
      
    },
  ];



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
                            id={tweet.id}
                            username={tweet.username}
                            text={tweet.text}
                            
                            
                            />
                        ))}
                    </div>

                   </div>
            </main>
        );
    }
}
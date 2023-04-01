import React ,{useState} from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import  { Tweet , tweet} from '../component/tweet';
import { Retweet, retweet } from '../component/retweet';
import  Modal  from '../component/modal';

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





const retweetTest: retweet = {
    id: 1,
    nameRetweeter: "John Doe",
    retweet: tweetTest,
};

interface props {
    //liste de tweets
    listOfTweets: tweet[];
    isOpen: boolean;
}


export class Accueil extends React.Component< any,props>{
    constructor(props: any) {
        super(props);
        this.state = {    
           //tableau de tweets
            listOfTweets: [],
            isOpen: false

           
        };
    }
   

    async componentDidMount(){
        const response = await fetch("http://localhost:5000/getAllTweets");
        const tweets = await response.json();
        console.log(tweets);
    }
    
 showModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
    };




    
 render(){   
   
        return (
            <main>
                <div className="accueil">
                    <Title content="Tweeterrr" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}} onClick={this.showModal} /> 
                  
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
                            <Retweet  id={1} nameRetweeter="John Doe" retweet={tweetTest} />
                   </div>
                   <Modal isOpen={this.state.isOpen} close={this.showModal} ></Modal>
            </main>
        );
    }
}
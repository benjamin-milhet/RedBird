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
        const listOfTweets = tweets.map((tweet: any) => {
            return {
                id: tweet.id,
                username: tweet.nom,
                text: tweet.tweet,
                
            };
        });
        this.setState({ listOfTweets });
        }

    
    
 

  closeModal = () => {
    this.setState({ isOpen: false });
    this.componentDidMount();
    };
    openModal = () => {
        this.setState({ isOpen: true });
        
        };



    
 render(){   

        return (
            <main>
                <div className="wrapper">
                <div className="accueil">
                    <Title content="Tweeterrr" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}} onClick={this.openModal} /> 
                  
                    <SearchBar onSearch={(query: string) => console.log(query)} />   
                   <div className="tweets">
                        {this.state.listOfTweets.map((tweet) => (
                            <Tweet
                            id={tweet.id}
                            username={tweet.username}
                            text={tweet.text}
                            
                            
                            />
                        ))}
                    </div>
                           
                   </div>
                   <Modal isOpen={this.state.isOpen} close={this.closeModal}  ></Modal>
                </div>
            </main>
        );
    }
}
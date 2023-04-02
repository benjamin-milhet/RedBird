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
        this.setState({ listOfTweets: this.sortTweetByMoreRecentId(listOfTweets) });


        const response2 = await fetch("http://localhost:5000/getAllSujet");
        const topics = await response2.json();
this.setState({listOfTopics:topics});
        }

    
    
       

  closeModal = () => {
    this.setState({ isOpen: false });
    this.componentDidMount();
    };
    openModal = () => {
        this.setState({ isOpen: true });
        
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
                    <Title content="Tweeterrr" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}} onClick={this.openModal} /> 
                  
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
                    <form className="search-bar" >
                        <input
                            type="text"
                            
                            onChange={(event) => this.setState({searchTopic :event.target.value})}
                            placeholder="Search..."
                            value={this.state.searchTopic}
                        />
                     <button className="reset_search" onClick={ ()=> this.setState({ searchTopic: "" })} >
              X
            </button>
                    </form>
      
                    <div className="liste_topics">
                    {filteredTopics.map((topic) => (
                        <div className="topic">
                        <text >{topic }</text>
                        <button className="topic_btn"  onClick={()=> this.setState({ searchTopic: topic })}>Voir</button>
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
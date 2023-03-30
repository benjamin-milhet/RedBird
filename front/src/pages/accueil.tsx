import React from 'react';
//import ReactDOM from 'react-dom/client';
import { Title } from '../component/title';
import { Input } from '../component/form/input';
import { Button } from '../component/button';
import SearchBar from '../component/searchBar';
import Tweet from '../component/tweet';


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

    const tags = ["#react", "#typescript", "#javascript"];
export class Accueil extends React.Component{


 render(){
        return (
            <main>
                <div className="accueil">
                    <Title content="Accueil" />
                    <Button className = "newTweetBtn" content="+" style={{   width: 50,height: 50}}  /> 
                  
                    <SearchBar onSearch={(query: string) => console.log(query)} />   
                    <Tweet username="John Doe" text="Hello World" date={new Date()} tags={tags} replies= {replies} />
                    
                </div>
            </main>
        );
    }
}
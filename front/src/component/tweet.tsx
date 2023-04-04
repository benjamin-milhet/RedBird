import React from "react";
import "./tweet.css";
import { useState } from "react";

export type tweet = {
  id: number;
    username: string;
    retweeter?: string;
    text: string;
  onclick?: () => void;
  clickOnTag?: (tag:string) => void;
  
}

export type TweetTag = {
  id: number;
  text: string;
};



 export class Tweet extends React.Component<tweet> {
  
  
  
 // recherche des tags dans le texte du tweet et stockage dans un tableau de string
 //ajouter un espace pour separer les tags du texte du tweet

 findTags = (text: string) => {
  const regex = /#[a-zA-Z0-9]+/g;
  const matches = text.match(regex);

  if (!matches) {
    return [];
  }

  return matches.map((match, index) => ({
    id: index,
    text: match,
  }));
};

  // enlever les tags du texte du tweet
  removeTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.replace(regex, "");
  };
  
  
isARetweet=()=> {
  if (this.props.retweeter === null || this.props.retweeter === undefined || this.props.retweeter === "") {
    return false;
  } else {
    return true;
  }
}
clickOnName = (name:string) => {
  window.location.href = "http://localhost:3000/user/" + name;
}
 

  render(): React.ReactNode {
    console.log(this.findTags(this.props.text));
    
    return (
      
      
      <div className="tweet">
      
        {this.isARetweet() && (
          <div className="retweet-header">
          <span className="retweet-username"onClick={()=>
          {if (this.isARetweet()) {this.clickOnName(this.props.retweeter||"")}
          }
          }
          
          >{this.props.retweeter}</span>
          <span className="retweet-retweet" > retweet</span>
          </div>
          
        )}
      
      <div
            className={`tweet-border${this.isARetweet() ? " retweeted" : ""}`}
          >
            <div className="tweet-header">
            <span className="tweet-username" onClick={()=>this.clickOnName(this.props.username)}>{this.props.username}</span>
            </div>

        <div className="tweet-body">
          <p className="tweet-text">{this.removeTags(this.props.text)}</p>
          
          
        
      
          {this.findTags(this.props.text).length > 0 && (
              <div className="tags">
                {this.findTags(this.props.text).map((tag) => (
                  <span
                    key={tag.id}
                    className="tweet-tags"
                    onClick={() => this.props.clickOnTag?.(removeHashtag(tag.text))}
                  > {tag.text}
                  </span>
                ))}
              </div>
            )}
          
      </div>
        <div className="tweet-footer">
        {!this.isARetweet() && (
          <button className="tweet-reply-button" onClick={this.props.onclick}>Retweeter</button>
        )}
        </div>
        
      </div>
    </div>
    );
  }
};






export function sortTweetByMoreRecentId (liste: tweet[]): tweet[]  {
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

  //fonction pour enlever le hashtag d'un tag
   function removeHashtag (tag: string): string {
    return tag.substring(1);
  }

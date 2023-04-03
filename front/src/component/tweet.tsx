import React from "react";
import "./tweet.css";
import { useState } from "react";
export type tweet = {
  id: number;
    username: string;
    retweeter: string;
    text: string;
  onclick: () => void;
  
}





 export class Tweet extends React.Component<tweet> {
  
  
  
 // recherche des tags dans le texte du tweet et stockage dans un tableau de string
   findTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.match(regex);
  };
  // enlever les tags du texte du tweet
   removeTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.replace(regex, "");
  };
isARetweet=()=> {
  if (this.props.retweeter === null) {
    return false;
  } else {
    return true;
  }
}
 

  render(): React.ReactNode {
    
    return (
      
      <div className="tweet">
      
        {this.isARetweet() && (
          <div className="retweet-header">
          <span className="retweet-username">{this.props.retweeter}</span>
          <span className="retweet-retweet"> retweet</span>
          </div>
          
        )}
      
      <div
            className={`tweet-border${this.isARetweet() ? " retweeted" : ""}`}
          >
            <div className="tweet-header">
            <span className="tweet-username">{this.props.username}</span>
            </div>

        <div className="tweet-body">
          <p className="tweet-text">{this.removeTags(this.props.text)}</p>
          
          
        
      
        {this.findTags(this.props.text)  && ( //props.tags && pour verifier si props.tags est défini idem pour reply
            <div className="tweet-tags">
              {this.findTags(this.props.text)?.map((tag, index) => (
                <span key={index} className="tweet-tag">{tag}</span>
              ))}
            </div>
          )}
      </div>
        <div className="tweet-footer">
        {!this.isARetweet() && (
          <button className="tweet-reply-button" onClick={this.props.onclick}>Retweet</button>
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
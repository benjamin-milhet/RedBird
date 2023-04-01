import React from "react";
import "./tweet.css";
import { useState } from "react";
export type tweet = {
  id: number;
    username: string;
    text: string;
   
  
}





export const Tweet = (props: tweet)  => {
 // recherche des tags dans le texte du tweet et stockage dans un tableau de string
  const findTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.match(regex);
  };
  // enlever les tags du texte du tweet
  const removeTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.replace(regex, "");
  };




  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="tweet-username">{props.username}</span>
        
      </div>
      <div className="tweet-body">
        <p className="tweet-text">{removeTags(props.text)}</p>
        
        
      
     
      {findTags(props.text)  && ( //props.tags && pour verifier si props.tags est défini idem pour reply
          <div className="tweet-tags">
            {findTags(props.text)?.map((tag, index) => (
              <span key={index} className="tweet-tag">{tag}</span>
            ))}
          </div>
        )}
    </div>
      <div className="tweet-footer">
        <button className="tweet-reply-button">Reply</button>
      </div>
      
    </div>
  );
};

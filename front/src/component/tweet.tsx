import React from "react";
import "./tweet.css";
export type tweet = {
    username: string;
    text: string;
    date: Date;
    tags?: string[];
    replies?: tweet[];
}



export const Tweet = (props: tweet) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="tweet-username">{props.username}</span>
        <span className="tweet-date">{props.date.toLocaleString()}</span>
      </div>
      <div className="tweet-body">
        <p className="tweet-text">{props.text}</p>
        
        {props.tags && props.tags?.length > 0 && ( //props.tags && pour verifier si props.tags est défini idem pour reply
          <div className="tweet-tags">
            {props.tags?.map((tag, index) => (
              <span key={index} className="tweet-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="tweet-footer">
        <button className="tweet-reply-button">Reply</button>
      </div>
      {props.replies && props.replies?.length > 0 && (
        <div className="tweet-replies">
          {props.replies?.map((reply, index) => (
            <Tweet
              key={index}
              username={reply.username}
              text={reply.text}
              date={reply.date}
              tags={reply.tags}
              replies={reply.replies}
            />
          ))}
        </div>
      )}
      
    </div>
  );
};

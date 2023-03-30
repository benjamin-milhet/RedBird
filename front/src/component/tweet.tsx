import React from "react";
import "./tweet.css";

interface TweetProps {
  username: string;
  text: string;
  date: Date;
  replies?: TweetProps[];
}

const Tweet: React.FC<TweetProps> = ({ username, text, date ,replies = [] }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="tweet-username">{username}</span>
        <span className="tweet-date">{date.toLocaleString()}</span>
      </div>
      <div className="tweet-body">
        <p className="tweet-text">{text}</p>
      </div>
      <div className="tweet-footer">
        <button className="tweet-reply-button">Reply</button>
      </div>
      {replies.length > 0 && (
        <div className="tweet-replies">
          {replies.map((reply, index) => (
            <Tweet
              key={index}
              username={reply.username}
              text={reply.text}
              date={reply.date}
            />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Tweet;

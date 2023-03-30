import React from "react";
import "./tweet.css";

interface TweetProps {
  username: string;
  text: string;
  date: Date;
  tags?: string[];
  replies?: TweetProps[];
}

const Tweet: React.FC<TweetProps> = ({ username, text,tags=[] ,date ,replies = [] }) => {
  return (
    <div className="tweet">
      <div className="tweet-header">
        <span className="tweet-username">{username}</span>
        <span className="tweet-date">{date.toLocaleString()}</span>
      </div>
      <div className="tweet-body">
        <p className="tweet-text">{text}</p>
        {tags.length > 0 && (
          <div className="tweet-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tweet-tag">{tag}</span>
            ))}
          </div>
        )}
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
              tags={reply.tags}
              replies={reply.replies}
            />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Tweet;


import React from "react";
import "./retweet.css";
import { useState } from "react";
import { Tweet, tweet } from "./tweet";

export type retweet = {
    id: number;
    nameRetweeter: string;
    retweet: tweet;
}

export const Retweet = (props: retweet) => {
    return (
        <div className="retweet">
            <div className="retweet-header">
                <span className="retweet-username">{props.nameRetweeter}</span>
                <span className="retweet-retweet"> retweet</span>
            </div>
            <Tweet
                id={props.retweet.id}
                username={props.retweet.username}
                text={props.retweet.text}
                
            />
        </div>
    );
};
import React from "react";
import { Tweet, tweet } from "../component/tweet";
import { Title } from "../component/title";
import { Button } from "../component/button";

interface props {
    listOfUserTweets: tweet[];
    user: string;
  
}
const test = "test";
const twetTest :tweet ={
    id: 1,
    username:
    "test",
    retweeter: "",
    text: "test",
};

export class User extends React.Component<any,props> {
    constructor(props: any) {
        super(props);
        this.state = {
            listOfUserTweets: [],
            user: "",
        };
    }
    async componentDidMount() {
//ajouter un tweet dans la liste de tweet
    let name=window.location.pathname.split("/")[2];
    console.log(name);
    this.setState({user: name});
        this.setState({
            listOfUserTweets: [twetTest],
        });
    }
 retour = () => {
    
};
  
    render(): React.ReactNode {
        return (
        <div>
            <Title content={"Tweets de "+ this.state.user} />
            <Button className = "retour-btn" content="Retour" onClick={()=> window.location.href = "http://localhost:3000/accueil"} />

            {this.state.listOfUserTweets.map((tweet: tweet) => (
            <Tweet
                id={tweet.id}
                username={tweet.username}
                retweeter={tweet.retweeter}
                text={tweet.text}
               
               // onclick={this.props.onclick}
            />
            ))}
            
        </div>
        );
    }
    }
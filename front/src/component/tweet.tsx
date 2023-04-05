import React from "react";
import "./tweet.css";

//type tweet
export type tweet = {
  id: number;
    username: string;
    retweeter?: string;
    text: string;
  onclick?: () => void;
  clickOnTag?: (tag:string) => void;
  
}

//type tag pour pouvoir cliquer sur un tag
export type TweetTag = {
  id: number;
  text: string;
};


//composant pour afficher un tweet
 export class Tweet extends React.Component<tweet> {
  

//fonction pour trouver les tags dans le texte du tweet
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

  //enlever les tags du texte du tweet
  removeTags = (text: string) => {
    const regex = /#[a-zA-Z0-9]+/g;
    return text.replace(regex, "");
  };
  
  //fonction pour savoir si le tweet est un retweet
  isARetweet=()=> {
    if (this.props.retweeter === null || this.props.retweeter === undefined || this.props.retweeter === "") {
      return false;
    } else {
      return true;
    }
  }

  //fonction pour cliquer sur le nom d'un utilisateur qui renvoie sur la page de l'utilisateur
  clickOnName = (name:string) => {
    window.location.href = "http://localhost:3000/user/" + name;
  }
 
  render(): React.ReactNode {
    console.log(this.findTags(this.props.text));
    
    return (
      
      <div className="tweet"// verifie si le tweet est un retweet
        >
      
        {this.isARetweet() && (
          <div className="retweet-header" 
          //si le tweet est un retweet, affiche le nom de l'utilisateur qui a retweeté
          >
          <span className="retweet-username"onClick={()=>
          {if (this.isARetweet()) {this.clickOnName(this.props.retweeter||"")}}}
          //si le tweet est un retweet, affiche le nom de l'utilisateur qui a retweeté

          >{this.props.retweeter}</span>
          <span className="retweet-retweet" > retweet</span>
          </div>
          
        )}
      
      <div
            className={`tweet-border${this.isARetweet() ? " retweeted" : ""}`}
            //si le tweet est un retweet on lui donne un style différent
          >
            <div className="tweet-header">
            <span className="tweet-username" onClick={()=>this.clickOnName(this.props.username)}
            // si on clique sur le nom de l'utilisateur, on est redirigé vers sa page
            >{this.props.username}</span>
            </div>

        <div className="tweet-body">
          <p className="tweet-text"
          /* on affiche le texte du tweet sans les tags pour pouvoir 
          leur donner un style différent */
          >{this.removeTags(this.props.text)}</p>

          {this.findTags(this.props.text).length > 0 && (
              <div className="tags"
              ///on map les tags trouvés dans le texte du tweet
                >
                {this.findTags(this.props.text).map((tag) => (
                  <span
                    key={tag.id}
                    className="tweet-tags"
                    onClick={() => this.props.clickOnTag?.(removeHashtag(tag.text))} 
                    //si on clique sur un tag, on enlève le hashtag et on appelle la fonction clickOnTag
                  > {tag.text}
                  </span>
                ))}
              </div>
            )}
          
      </div>
        <div className="tweet-footer">
        {!this.isARetweet() && (
          //si le tweet n'est pas un retweet, on affiche le bouton retweeter
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

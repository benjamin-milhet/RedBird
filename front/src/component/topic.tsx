import React from "react";

export type topic = {
  name: string;
  onClick?: () => void;
}

//composant pour afficher un topic
export class Topic extends React.Component< topic> {
    render(): React.ReactNode {
        return (
        <div className="topic" onClick={this.props.onClick}>
            {this.props.name}
        </div>
        );
    }
    }

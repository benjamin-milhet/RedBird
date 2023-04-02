import { type } from "os";
import React from "react";

export type topic = {
  name: string;
  onClick?: () => void;
}

export class Topic extends React.Component< topic> {
    render(): React.ReactNode {
        return (
        <div className="topic" onClick={this.props.onClick}>
            {this.props.name}
        </div>
        );
    }
    }

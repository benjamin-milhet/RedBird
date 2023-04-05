import React from "react";
import "./title.css"

type TitleProps = {
    content: string;
}

export class Title extends React.Component<TitleProps, {}> {
    render(): React.ReactNode {
        return (
            <div className="title_h1">{this.props.content}</div>
        );
    }
}
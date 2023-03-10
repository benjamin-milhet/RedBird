import React from "react";
import "./title.css"

type TitleProps = {
    content: string;
}

export class Title extends React.Component<TitleProps, {}> {
    render(): React.ReactNode {
        return (
            <h1 className="title_h1">{this.props.content}</h1>
        );
    }
}
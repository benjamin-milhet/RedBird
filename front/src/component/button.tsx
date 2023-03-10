import React from "react";
import "./button.css"

type ButtonProps = {
    content: string,
}

export class Button extends React.Component<ButtonProps> {

    render(): React.ReactNode {
        return (
            <button className="button_component" type="button">{this.props.content}</button>
        );
    }
}
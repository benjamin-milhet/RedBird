import React from "react";
import "./button.css"

type ButtonProps = {
    content: string,
    className?: string,
    onClick?: () => void,
    style?: React.CSSProperties 
}

export class Button extends React.Component<ButtonProps> {

    render(): React.ReactNode {
       
        return (
            <button className={`button_component ${this.props.className}`} onClick={this.props.onClick} type="button" style={this.props.style} >{this.props.content} </button>
        );
    }
}
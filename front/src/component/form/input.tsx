import React from "react";
import "./input.css"

type InputProps = {
    label: string,
    type?: string,
    value?: string,
    placeholder?: string,
};

export class Input extends React.Component<InputProps> {
    render(): React.ReactNode {
        return (
            <div className="input_div">
                <label className="input_label">{this.props.label}</label>
                <input className="input_input" type={this.props.type} value={this.props.value} placeholder={this.props.placeholder}/>
            </div>
        );
    }
}
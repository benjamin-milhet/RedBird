import React from "react";
import "./radioBoxList.css"

type RadioBoxListProps = {
    label: string,
    radioBoxOptions: RadioBoxOptions[],
}

type RadioBoxOptions = {
    name: string,
}

export class RadioBoxList extends React.Component<RadioBoxListProps> {
    render(): React.ReactNode {
        return (
            <div className="radioboxlist_div">
                <label className="radioboxlist_label">{this.props.label}</label>
                <div className="radioboxlist_container">
                {
                    this.props.radioBoxOptions.map((value) => {
                        return (
                            <div className="radiobox_div">
                                <input type="radio" name={this.props.label} className="radiobox_input"/>
                                <span className="radiobox_span">{value.name}</span>
                            </div>
                        );
                    })
                }
                </div>
                
            </div>
        );
    }
}
import React, { useState } from "react";
import "./forms.css";


interface MyFormProps {
  getValue : (value: string) => void;
  options: { label: string; value: string }[];
}

export function MyForm(props: MyFormProps) {
  const [option, setOption] = useState(props.options[0].value); 

    const getValue = (value: string) => {
        setOption(value);
        props.getValue(value);
    };

  return (
    <form className="my-form" >
      <div className="radio-group">
        {props.options.map((optionItem) => (
          <label
            key={optionItem.value}
            className={`radio-btn ${
              option === optionItem.value ? "selected" : ""
            }`}
          >
            <input className="radio-input"
              type="radio"
              name="radio-group"
              value={optionItem.value}
              checked={option === optionItem.value}
              onChange={() => getValue(optionItem.value)}
            />
            {optionItem.label}
          </label>
        ))}
      </div>
    </form>
  );
}


export const  options = [
    { label: "Utilisateur", value: "user" },
    { label: "Topics", value: "topic" },
    { label: "Texte", value: "text" },
  ];
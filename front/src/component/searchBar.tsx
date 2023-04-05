import React from "react";
import "./searchBar.css";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  value?: string;
  holder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

}

//composant pour afficher une barre de recherche personnalisée
export class SearchBar extends React.Component<SearchBarProps> {


  render(): React.ReactNode {
       
    return (
      <form className="searchBar" >
        <input className="searchBar_input"
            type="text"
            
            onChange={this.props.onChange}
            placeholder={this.props.holder}
            value={this.props.value}
            onKeyDown={this.props.onKeyDown}
        />
        <button type="reset" className="reset_search" 
            onClick={ this.props.onReset} 
              >
            X
        </button>
    </form>
    );
  };
}

export default SearchBar;
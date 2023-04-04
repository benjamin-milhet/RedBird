import React from "react";
import "./searchBar.css";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  
  holder?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

}

export class SearchBar extends React.Component<SearchBarProps> {


  render(): React.ReactNode {
       
  return (
    <form className="searchBar" >
                        <input className="searchBar_input"
                            type="text"
                            
                            onChange={this.props.onChange}
                            placeholder={this.props.holder}
                        
                            onKeyDown={this.props.onKeyDown}
                        />
                        <button type="reset" className="reset_search" 
                            onClick={ this.props.onReset} //fonction pour reset 
                             >
                            X
                        </button>
                    </form>
  );
};
}

export default SearchBar;
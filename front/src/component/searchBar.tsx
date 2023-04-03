import React from "react";
import "./searchBar.css";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  value: string;

}

export class SearchBar extends React.Component<SearchBarProps> {


  render(): React.ReactNode {
       
  return (
    <form className="searchBar" >
                        <input className="searchBar_input"
                            type="text"
                            
                            onInput={this.props.onChange}
                            placeholder="Search..."
                            value={this.props.value}
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
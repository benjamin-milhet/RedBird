import React from "react";
import "./searchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

// cela permet de définir les types des props
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
 // on déclare une variable query qui est de type string et qui est initialisée à une chaine vide
  const [query, setQuery] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // on met à jour la valeur de query
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
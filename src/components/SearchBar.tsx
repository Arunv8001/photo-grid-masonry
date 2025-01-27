interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearch: (event: React.FormEvent) => void;
}

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
}: Readonly<SearchBarProps>) => {
  return (
    <div className="search-bar">
      <div className="search-label">Discover the Power of Pixels</div>
      <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search images..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar-input"
      />
      <button type="button" onClick={handleSearch}>Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

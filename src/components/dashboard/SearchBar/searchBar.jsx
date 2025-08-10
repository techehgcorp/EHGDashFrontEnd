const SearchBar = ({ placeholder = 'Search...', onSearch }) => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && onSearch) {
        onSearch(e.target.value);
      }
    };
  
    return (
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
        style={{
          padding: '8px 12px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '20px',
          width: '300px',
          outline: 'none',
        }}
      />
    );
  };
  
  export default SearchBar;
  
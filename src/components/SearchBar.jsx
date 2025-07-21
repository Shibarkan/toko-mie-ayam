import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch, allProducts }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const input = e.target.value;
    setQuery(input);
    onSearch(input);

    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.nama.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // maksimal 5 saran
  };

  const handleSuggestionClick = (nama) => {
    setQuery(nama);
    setSuggestions([]);
    onSearch(nama);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Cari menu..."
          value={query}
          onChange={handleInput}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(s.nama)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {s.nama}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

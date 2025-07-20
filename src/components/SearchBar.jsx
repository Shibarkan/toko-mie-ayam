import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="flex justify-center my-6 px-4">
      <div className="relative w-full max-w-xl">
        <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Cari menu favoritmu..."
          className="w-full pl-11 pr-4 py-2 rounded-full shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FB4141] text-sm md:text-base"
        />
      </div>
    </div>
  );
};

export default SearchBar;

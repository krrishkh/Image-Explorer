import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };


  return (
    <>

        <form onSubmit={handleSubmit} className="flex justify-center mb-6">
        <input
            type="text"
            placeholder="Search for images..."
            className="text-gray-500 border px-4 py-2 w-1/2 rounded-l-md focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button
            type="submit"
            className="bg-slate-600 text-white px-4 py-2 rounded-r-md hover:bg-slate-800 transition duration-200"
        >
            Search
        </button>
        </form>
    </>
    
  );
};

export default SearchBar;
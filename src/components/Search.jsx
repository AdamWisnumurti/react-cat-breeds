import React, { useState } from 'react';
import { BsSearch, BsX } from 'react-icons/bs';

const Search = ({
  data,
  listSuggest,
  setListSuggest,
  searchTerm,
  setSearchTerm,
}) => {
  // Function to handle input change and update search term
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Perform search logic here to filter the options based on the search term
    const newSuggestions = data.filter((option) =>
      option.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    // Only give suggestion when user type 3 word or more
    if (newSearchTerm.length === 0) {
      return;
    } else {
      setTimeout(() => {
        setListSuggest(newSuggestions);
      }, 1000);
    }
  };

  const handleDeleteSuggest = () => {
    setSearchTerm('');
    setListSuggest([]);
  };

  return (
    <div className=" flex items-center border focus:ring-indigo-500 focus:border-indigo-500 rounded-xl bg-white">
      <input
        value={searchTerm}
        onChange={handleInputChange}
        className="block w-full p-4 rounded-xl"
        placeholder="Search..."
      />

      <div className="flex pl-2 pr-4 bg-primary text-gray-400 rounded-md text-md">
        {searchTerm ? (
          <BsX
            onClick={handleDeleteSuggest}
            className="cursor-pointer"
            size={24}
          />
        ) : (
          <BsSearch size={24} className="px-1" />
        )}
      </div>
    </div>
  );
};

export default Search;
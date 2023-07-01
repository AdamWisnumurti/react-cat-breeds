import React from 'react';
import { BsSearch, BsX } from 'react-icons/bs';

const Search = ({
  data,
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
    <div className=" flex items-center rounded-xl border bg-white focus:border-indigo-500 focus:ring-indigo-500">
      <input
        value={searchTerm}
        onChange={handleInputChange}
        className="block w-full rounded-xl p-4"
        placeholder="Search..."
      />

      <div className="bg-primary text-md flex rounded-md pl-2 pr-4 text-gray-400">
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

import React, { useState, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import { BsSearch, BsX } from 'react-icons/bs';

// Still incomplete
// Should have options {name, value} and setSelected object props
const AutoComplete = ({
  options,
  setSelected,
  maxSuggest = 5,
  isLoad = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autocompleteRef = useRef(null);

  // Function to handle input change and update search term
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Perform search logic here to filter the options based on the search term
    const newSuggestions = options.filter((option) =>
      option.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    // Only give suggestion when user type 3 word or more
    if (newSearchTerm.length < 3) {
      setSuggestions([]);
    } else {
      setSuggestions(newSuggestions);
    }
  };

  // Function to handle item selection from the autocomplete dropdown
  const handleItemSelected = (item) => {
    if (item) {
      setSelectedItem(item);
      setSearchTerm(item.name);
      setSelected(item.value);
      setSuggestions([]);
    }
  };

  const handleDeleteSuggest = () => {
    setSelectedItem('');
    setSearchTerm('');
    setSelected('');
    setSuggestions([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (
        selectedIndex > suggestions.length - 1 ||
        selectedIndex > maxSuggest - 2
      ) {
        setSelectedIndex(0);
      } else if (selectedIndex < suggestions.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (searchTerm && suggestions.length > 0) {
        handleItemSelected(suggestions[selectedIndex]);
      } else if (searchTerm) {
        handleItemSelected(
          options?.find(
            (item) =>
              item.name.toLowerCase() === searchTerm.toLowerCase()
          )
        );
      }
    }
  };

  const handleOutsideClick = (event) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(event.target)
    ) {
      setSuggestions([]);
      setSelectedIndex(0);
    }
  };

  // Event listener to handle clicks outside the component
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className=" w-full" ref={autocompleteRef}>
      <Listbox value={selectedItem} onChange={handleItemSelected}>
        <div className="relative">
          <div className=" flex items-center focus:border-indigo-500 focus:ring-indigo-500">
            <input
              value={searchTerm}
              onChange={handleInputChange}
              className="block w-full rounded-md border bg-gray-200 p-2"
              placeholder="Search..."
              onKeyDown={handleKeyDown}
              disabled={isLoad}
            />

            <div className="bg-primary text-md flex rounded-md p-1 text-gray-400">
              {searchTerm ? (
                <BsX
                  onClick={handleDeleteSuggest}
                  className="cursor-pointer"
                  size={20}
                />
              ) : (
                <BsSearch size={20} className="px-1" />
              )}
            </div>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute mt-1 w-full rounded-md bg-white">
              {suggestions.slice(0, maxSuggest).map((item, index) => (
                <div
                  className={`shadow-xs mt-1 cursor-pointer rounded px-2 py-2 text-xs hover:bg-gray-100 ${
                    selectedIndex === index
                      ? 'bg-gray-100'
                      : 'bg-white'
                  }`}
                  key={index}
                  onClick={() => handleItemSelected(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </Listbox>
    </div>
  );
};

export default AutoComplete;

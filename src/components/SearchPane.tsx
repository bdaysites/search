import React, { useState } from 'react';
import axios from 'axios';

interface SearchPaneProps {
  documentText: string;
}

const SearchPane: React.FC<SearchPaneProps> = ({ documentText }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.post('http://localhost:5000/search', {
          query,
          text: documentText,
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Document</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter keyword(s)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSearch}
      >
        Search
      </button>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Results:</h3>
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="p-2 border-b border-gray-200">
              {result}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPane;

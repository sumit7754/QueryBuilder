import React, { useState } from 'react';
import QueryBuilder from './components/QueryBuilder';

const App = () => {
  const [addQuery, setAddQuery] = useState(false);

  const handleClick = () => {
    setAddQuery(!addQuery);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side: Fixed Sidebar */}
      <div className="w-1/5 h-screen bg-gray-100 dark:bg-gray-800 p-4 flex flex-col justify-center items-center">
        <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {addQuery ? 'Remove Query' : 'Add Query'}
        </button>
      </div>

      {/* Right Side: Scrollable Content */}
      <div className="w-4/5 h-screen overflow-y-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
        {addQuery ? (
          <QueryBuilder onClose={() => setAddQuery(false)} />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">
            <h1 className="text-2xl font-semibold mb-4">No query yet!</h1>
            <p>Click the button to add a new query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

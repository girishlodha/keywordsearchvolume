import React, { useState } from 'react';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:5000'; // Update with your backend URL

  const [input, setInput] = useState('');
  const [median, setMedian] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateMedian = async () => {
    try {
      setLoading(true); // Set loading to true when the request is initiated
      const response = await axios.get(`http://localhost:5000/api/calculate-median/${input}`);
      setMedian(response.data.median);
    } catch (error) {
      console.error('Error calculating median:', error);
    } finally {
      setLoading(false); // Set loading to false when the request is completed (success or error)
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 shadow-md rounded-md">
      <h1 className="text-3xl font-semibold mb-4">Keyword Search Volume</h1>
      <label className="block mb-4">
        <span className="text-gray-700">Type your keyword here</span>
        <input
          className="form-input mt-1 block w-full border rounded-md"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={calculateMedian}
      >
        Enter
      </button>
      {loading && <p className="mt-4">Loading...</p>}
      {median !== null && !loading && <p className="mt-4">Volume: {median}</p>}
    </div>
  );
}

export default App;

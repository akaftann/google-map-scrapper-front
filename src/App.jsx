import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputText.trim() === '') {
      setErrorMessage('Field can\'t be empty');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://google-scrapper.salmonmeadow-e1ce40e9.northeurope.azurecontainerapps.io', { reqString: inputText });
      console.log('Відповідь від сервера:', response);

      setServerResponse(response.data);
    } catch (error) {
      console.error('Помилка при відправці запиту:', error);
      setErrorMessage('Error fetching data from the server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Google scrapper</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Input search request:
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
        <button type="submit">Send</button>
        {isLoading ? <p>Loading...</p> : null}
        {serverResponse && !isLoading && (
          <div>
            <h2>Server Response:</h2>
            <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
          </div>
        )}
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default App;

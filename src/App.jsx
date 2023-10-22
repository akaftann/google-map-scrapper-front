import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевіряємо, чи не є поле пустим перед відправленням запиту
    if (inputText.trim() === '') {
      setErrorMessage('Field can\'t be empty ');
      return;
    }

    setErrorMessage('');
    setIsLoading(true); 

    try {
      const response = await axios.post('https://google-scrapper.salmonmeadow-e1ce40e9.northeurope.azurecontainerapps.io', { reqString: inputText }, { responseType: 'blob' });
      console.log('Відповідь від сервера:', response);

      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Помилка при відправці запиту:', error);
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
        {isLoading ? <p>Loading...</p> : null} {/* Відображення індікатора очікування */}
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default App;

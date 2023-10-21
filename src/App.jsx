import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевіряємо, чи не є поле пустим перед відправленням запиту
    if (inputText.trim() === '') {
      setErrorMessage('Field can\'t be empty ');
      return;
    }

    console.log('start query');
    setErrorMessage('');

    try {
      const response = await axios.post('https://google-scrapper.salmonmeadow-e1ce40e9.northeurope.azurecontainerapps.io', { reqString: inputText }, { responseType: 'blob' });
      console.log('Відповідь від сервера:', response);

      // Створюємо об'єкт URL для завантаження Excel-файлу
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.xlsx');
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error('Помилка при відправці запиту:', error);
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
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default App;

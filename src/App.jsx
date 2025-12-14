import { useState, useEffect } from 'react'
import './styles/global.css'

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Fetch trivia categories
    fetch('https://opentdb.com/api_category.php')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      })
      .then(data => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false)
      })
  }, []);

  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>Quiz App</h1>
        </header>
        <main className="main">
          <p className="error">Error: {error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Quiz App</h1>
      </header>
      <main className="main">
        <h2>Available Categories</h2>
        <ul className="category-list">
          {categories.map(cat => (
            <li key={cat.id} className="category-item">
              {cat.name}
            </li>
          ))}
        </ul>
        <p>{categories.length}categories loaded successfully</p>
      </main>
    </div>
  );
}

export default App
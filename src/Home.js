// Home.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const content = {
    title: "Eoghan O'Mahony",
    text: [
      "A hardworking third-level student pursuing a career in the software development space",
      "Currently studying Immersive Software Engineering at the University of Limerick",
    ],
  };

  const highlightSearchTerm = (text, term) => {
    if (!term.trim()) {
      // If the search term is empty, return the original text
      return text;
    }

    // Highlight the search term in the content
    const lowercasedSearch = term.toLowerCase();
    return text.replace(
      new RegExp(`(${lowercasedSearch})`, 'gi'),
      (match, p1) => `<span class="highlight">${p1}</span>`
    );
  };

  return (
    <section className="home-page">
      <NavBar />
      <div>
        <section className="main-content">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <h1 className="title">{content.title}</h1>
            <div className="content-text">
              {content.text.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: highlightSearchTerm(paragraph, searchTerm) }} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default Home;

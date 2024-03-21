// Home.js
import React, { useState } from 'react';
import NavBar from './components/NavBar';

function Home() {
  const backgroundImageStyle = {
    width: '90%',
    height: '300px',
    background: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/Headset_v7-removebg-preview.png)",
    backgroundSize: 'cover', // Ensure the background image covers the container
    backgroundRepeat: 'no-repeat',
  }

  const [searchTerm, setSearchTerm] = useState('');
  const content = {
    title: "Freedome",
    text: [
      "\"Freedom, hand's free\"",
      "A groundbreaking device to control your computer with the movement of your head",
      "The future is now",
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
      <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
      <div>
      {/* <div className="sketchfab-embed-wrapper">
      <iframe className='sketchfab-embed'
        title="Headset V10"
        frameBorder="0"
        allowFullScreen
        mozAllowFullScreen={true}
        webkitAllowFullScreen={true}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src="https://sketchfab.com/models/4010bb23e4da456c8d28d69235596cb5/embed?autospin=1&autostart=1&ui_theme=dark"
      ></iframe>
    </div> */}

      <section className="main-content" style={backgroundImageStyle}>
          {/* Search Bar */}
          

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

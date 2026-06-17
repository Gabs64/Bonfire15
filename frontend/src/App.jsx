import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import ParticlesBg from './components/ParticlesBg';
import Home from './pages/Home';
import Music from './pages/Music';
import Guestbook from './pages/Guestbook';
import Band from './pages/Band';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [songs, setSongs] = useState([]);
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState(null);

  // Fetch songs from Java backend on mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/songs`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSongs(data);
          }
        }
      } catch (err) {
        console.warn("Backend API offline. No songs available.", err);
      } finally {
        // Always mark as loaded, whether fetch succeeded or failed
        setSongsLoaded(true);
      }
    };
    fetchSongs();
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            analyser={analyser} 
            isPlaying={isPlaying} 
            songs={songs} 
            activeSongIndex={activeSongIndex}
            setActiveSongIndex={setActiveSongIndex}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'music':
        return (
          <Music 
            songs={songs}
            songsLoaded={songsLoaded}
            setSongs={setSongs}
            activeSongIndex={activeSongIndex}
            setActiveSongIndex={setActiveSongIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        );
      case 'guestbook':
        return <Guestbook />;
      case 'band':
        return <Band />;
      default:
        return (
          <Home 
            analyser={analyser} 
            isPlaying={isPlaying} 
            songs={songs} 
            activeSongIndex={activeSongIndex}
            setActiveSongIndex={setActiveSongIndex}
            setIsPlaying={setIsPlaying}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Glow Particles Ambient Backdrop */}
      <ParticlesBg />

      {/* Floating Glass Navbar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Responsive Grid Layout */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Fixed Glowing Audio Player */}
      {songs.length > 0 && (
        <AudioPlayer 
          songs={songs}
          activeSongIndex={activeSongIndex}
          setActiveSongIndex={setActiveSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onAnalyserCreated={setAnalyser}
        />
      )}
    </div>
  );
}

import axios from 'axios';
import Player from './Components/Player';
import Song from './Components/Song';
import './styles/app.scss';
import { useState, useRef, useEffect } from 'react';
import Library from './Components/Library';
import Nav from './Components/Nav';

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);
  const [libraryStatus, setLibraryStatus] = useState(false);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://spotify23.p.rapidapi.com/recommendations/?limit=15&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry', {
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_API_KEY,
            'x-rapidapi-host': process.env.REACT_APP_API_HOST
          }
        });
        setSongs(response.data.tracks);
        setCurrentSong(response.data.tracks[Math.floor(Math.random() * response.data.tracks.length)]);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}></Nav>
      <Song isPlaying={isPlaying} currentSong={currentSong}></Song>
      <Player audioRef={audioRef} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></Player>
      <Library isPlaying={isPlaying} libraryStatus={libraryStatus} currentSong={currentSong} setIsPlaying={setIsPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs}></Library>
    </div>
  );
}

export default App;
import Player from './Components/Player';
import Song from './Components/Song';
import './styles/app.scss';
import data from './data'
import { useState,useRef } from 'react';
import Library from './Components/Library';
import Nav from './Components/Nav';

function App() {
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null);
  const [libraryStatus,setLibraryStatus]=useState(false)

  return (
    <div className={`App ${libraryStatus?'library-active':''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}></Nav>
      <Song isPlaying={isPlaying} currentSong={currentSong}></Song>
      <Player audioRef={audioRef} songs={songs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}></Player>
      <Library isPlaying={isPlaying} libraryStatus={libraryStatus} currentSong={currentSong} setIsPlaying={setIsPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs}></Library> 
     

    </div>
  );
}

export default App;

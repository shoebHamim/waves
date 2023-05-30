import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({isPlaying, libraryStatus, audioRef,songs,setCurrentSong,setIsPlaying,currentSong}) => {
  return (
    <div>
      <div className={`library  ${libraryStatus?'active-library':'none'}`}>
      <h2>Library</h2>
        {songs.map(s=><LibrarySong isPlaying={isPlaying} currentSong={currentSong} setIsPlaying={setIsPlaying} audioRef={audioRef} key={s.id} setCurrentSong={setCurrentSong} song={s} ></LibrarySong>)}

      </div>
    </div>
  );
};

export default Library;
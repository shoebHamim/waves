
import React from 'react';

const LibrarySong = ({ isPlaying, currentSong, song, setCurrentSong, audioRef, setIsPlaying }) => {
  const selectSongHandler = async () => {
    await setCurrentSong(song)
    setIsPlaying(true)
  }
  return (
    <div className={`library-song ${(song === currentSong) ? "selected" : "none"}`} onClick={selectSongHandler}>
      <img src={song.cover} alt="" />
      <div className="song-info">
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </div>

    </div>
  );
};

export default LibrarySong;
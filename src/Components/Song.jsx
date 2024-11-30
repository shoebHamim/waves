import React from 'react';

const Song = ({currentSong,isPlaying}) => {
  
  return (
    <div className='song-container'>
      <img className={isPlaying?'spin':'none' } src={`${currentSong.album.images[0].url}`} alt="" />
      <h2>{currentSong?.name}</h2>
      <h3>{currentSong?.artists[0].name}</h3>
    </div>
  );
};

export default Song;
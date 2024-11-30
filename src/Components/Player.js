import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ audioRef, songs, currentSong, isPlaying, setIsPlaying, setCurrentSong }) => {

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    slider: 0,
  })

  const playSongHandler = async (e) => {
    if (isPlaying) {
      await audioRef.current.pause()
      setIsPlaying(false)
    }
    else {
      await audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const dragHandler = e => {
    const slider = Math.floor((e.target.value / songInfo.duration) * 100)
    setSongInfo({ ...songInfo, currentTime: e.target.value,slider})
    setIsPlaying(true)
    audioRef.current.currentTime = e.target.value;


  }
  // change song
  const changeSong = async (value) => {
    setSongInfo({
      currentTime: 0,
      duration: 0,
      slider: 0,
    })
    let idx = songs.indexOf(currentSong)
    if (value === 'next') {
      await setCurrentSong(songs[(idx + 1) % songs.length])
    }
    else if (value === 'prev') {
      if (idx === 0) {
        idx = songs.length
      }
      await setCurrentSong(songs[(idx - 1) % songs.length])
    }

  }
  const onTimeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const slider = Math.floor((currentTime / duration) * 100)
    setSongInfo({ ...songInfo, currentTime, duration, slider })
  }
  const songEndHandler = async () => {
    let idx = songs.indexOf(currentSong)
    await setCurrentSong(songs[(idx + 1) % songs.length])
  }
  const onLoadplayHandler = (e) => {
    onTimeUpdateHandler(e)
    if (isPlaying) {
      audioRef.current.play()
    }
  }

  // add style to the slider
  const trackAnim = {
    transform: `translateX(${songInfo.slider}%)`
  }


  return (
    <div className='player' >

      <div className="time-control">
        <p>{parseInt(songInfo.currentTime / 60)}:{("0" + (Math.floor(songInfo.currentTime) % 60)).slice(-2)}</p>
        <div className="track" style={{ background: `linear-gradient(to right,,)` }}>

          <input onChange={dragHandler} min={0}
            max={songInfo.duration ? songInfo.duration : 0}
            value={songInfo.currentTime} type="range" />
          <div className="animate-track" style={trackAnim}>

          </div>
        </div>

        <p>{parseInt((songInfo.duration ? songInfo.duration : 0) / 60)}:{("0" + Math.floor((songInfo.duration ? songInfo.duration : 0) % 60)).slice(-2)}</p>


      </div>
      <div className="play-control">
        <FontAwesomeIcon onClick={(e) => changeSong('prev')} icon={faAngleLeft} size='2x'></FontAwesomeIcon>
        <FontAwesomeIcon onClick={playSongHandler} className='play' icon={isPlaying ? faPause : faPlay} size='2x'></FontAwesomeIcon>
        <FontAwesomeIcon onClick={(e) => changeSong('next')} icon={faAngleRight} size='2x'></FontAwesomeIcon>

      </div>
      <audio
        onCanPlay={onLoadplayHandler} onEnded={songEndHandler} onTimeUpdate={onTimeUpdateHandler} ref={audioRef} src={currentSong.preview_url}></audio>
    </div>
  );
};

export default Player;
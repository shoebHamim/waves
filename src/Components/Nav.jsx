import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Nav = ({libraryStatus,setLibraryStatus}) => {
  return (
    <nav>
      <div className='logo'>
        <img src="wave-sound.png" alt="" height={"30px"}/>
      <h1>Waves</h1>
      </div>
      <button onClick={()=>setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
      </button>
    </nav>
  );
};

export default Nav;
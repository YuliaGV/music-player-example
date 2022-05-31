import React, { useContext } from 'react';
import playerContext from '../context/playerContext'



const Header = () => {

  const {
    currentSong,
    songslist,
  } = useContext(playerContext);


  return (
    <header>
        <h3>Music Player - {songslist[currentSong].title}</h3>
    </header>
  )
}

export default Header 
import React, {useContext} from 'react'
import { IoArrowDownCircleSharp, IoHeartOutline, IoEllipsisVerticalSharp } from "react-icons/io5";

import playerContext from '../../context/playerContext';

import styled from 'styled-components'


const fav = () => {
  alert('Agregado a favoritos');
}

const ActionsBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }

  .album_image {
    width: 100%;
    height: auto;
  }

  .action_btns button {
    width: 30px;
    height: 30px;
    border-radius: 25%;
    background: #0034c4;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 5px;
    cursor: pointer;
  }

`


const Actions = () => {


  const {
    currentSong,
    songslist,
  } = useContext(playerContext);


  return (
    <ActionsBox>
      <div className="album_image">
        <img src="https://freemusicarchive.org/image/?file=images%2Falbums%2FComfort_Fit_-_Forget_And_Remember_-_20091216192301697.png&width=290&height=290&type=image" alt="album_image" />
      </div>
      <div className="album_info">
        <div className="album_meta">
          <span className="alb_label">ALBUM</span>
          <h1>{songslist[currentSong].albumTitle}</h1>
        </div>
        <div className="action_btns">
          <button onClick={() => fav()} className="fav_btn">
            <IoHeartOutline />
          </button>
          <button onClick={() => fav()} className="fav_btn">
            <IoArrowDownCircleSharp />
          </button>
          <button onClick={() => fav()} className="fav_btn">
            <IoEllipsisVerticalSharp />
          </button>
        </div>
      </div>
    </ActionsBox>
  )
}

export default Actions
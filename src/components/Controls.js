import React, { useState, useEffect, useRef, useContext } from 'react'
import playerContext from '../context/playerContext'

import styled from 'styled-components'
import { IoPlay, IoPlaySkipBack, IoPlaySkipForwardSharp, IoPause, IoVolumeMediumSharp } from "react-icons/io5";



const ControlsStyled = styled.div`
    background: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr;
    textAlign: "center";
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 5px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 1fr;
  ` 
    

const ButtonsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    margin: 1.5rem;
    color: #0034c4;
    cursor: pointer;
    
`

const BarBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .progress {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;

      input {
        width: 80%;
        background: #73d0f5
      }
 
      
    }
`

const OptionsBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .volume {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
`
   
const Controls = () => {


  // Global State
  const {
    currentSong,
    nextSong,
    prevSong,
    playing,
    togglePlaying,
    handleEnd,
    songslist,
  } = useContext(playerContext)

  const audio = useRef('audio_tag')

  // self State
  const [statevolum, setStateVolum] = useState(0.3)
  const [dur, setDur] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const fmtMSS = (s) => {
    return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + ~~s
  }

  const toggleAudio = () =>
    audio.current.paused ? audio.current.play() : audio.current.pause()

  const handleVolume = (q) => {
    setStateVolum(q)
    audio.current.volume = q
  }

  const handleProgress = (e) => {
    let compute = (e.target.value * dur) / 100
    setCurrentTime(compute)
    audio.current.currentTime = compute
  }

  useEffect(() => {
    audio.current.volume = statevolum
    if (playing) {
      toggleAudio()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong])

  return (
    <ControlsStyled>

      <ButtonsBox>
        <span className="prev" onClick={prevSong}>
          < IoPlaySkipBack />
        </span>

        <span
          className="play"
          onClick={() => {
            togglePlaying()
            toggleAudio()
          }}
        >
          <span className={!playing ? '' : 'hide'}>
            {!playing ? <IoPlay /> : <IoPause />}
          </span>
        </span>

        <span className="next" onClick={nextSong}>
          <IoPlaySkipForwardSharp />
        </span>
      </ButtonsBox>

      <BarBox>
        <div className="songMeta">
          <span className="songtitle">{songslist[currentSong].artistName} - {songslist[currentSong].title}</span>
        </div>
        <div className="progress">
          <input
            onChange={handleProgress}
            value={dur ? (currentTime * 100) / dur : 0}
            type="range"
            name="progresBar"
            id="prgbar"
          />
          <span className="currentT">{fmtMSS(currentTime)}</span>/
          <span className="totalT">{fmtMSS(dur)}</span>
        </div>
      </BarBox>


      <OptionsBox>
        <audio
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onCanPlay={(e) => setDur(e.target.duration)}
          onEnded={handleEnd}
          ref={audio}
          type="audio/mpeg"
          preload="true"
          src={songslist[currentSong].fileUrl}
        />
        <div className="volume">
          <span className="volum">
            <IoVolumeMediumSharp />
          </span>
          <input
            value={Math.round(statevolum * 100)}
            type="range"
            name="volBar"
            id="volBar"
            onChange={(e) => handleVolume(e.target.value / 100)}
          />
        </div>
      </OptionsBox>

   
      
      
    </ControlsStyled>
  )
}

export default Controls
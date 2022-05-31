import React from 'react'

import Header from './components/Header'
import Actions from './components/playlist/Actions'

import PlayList from './components/playlist/PlayList'
import Controls from './components/Controls'
import PlayerState from './context/playerState'


import { Container } from '@mui/material'


function Audioplayer() {
  return (
    <PlayerState >
      <Container maxWidth="lg" style={{ margin: '0 auto',  textAlign: 'center', marginBottom: '15rem' }}>
        <div>
          <Header />  
          <Actions />
          <PlayList />
        </div>
      </Container>
      <Controls />
    </PlayerState>
  )
}

export default Audioplayer
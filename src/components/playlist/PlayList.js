import React, { useContext } from 'react'


import { IoPlay,  IoHeartOutline } from "react-icons/io5";

import playerContext from '../../context/playerContext';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import styled from 'styled-components'


const ButtonsBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        width: 25px;
        height: 25px;
        background: transparent;
        font-size: 1.3rem;
        border: none;
        color: #0034c4;
        background: #fff;
        cursor: pointer;
    }

    .favorite_btn {
        color: #f334a5;
    }

`


function PlayList() {

    const { SetCurrent, currentSong, songslist } = useContext(playerContext);

    const fav = () => {
        console.log('I like this one');
    }

    return (
        <div style={{ textAlign: 'center' }}>

            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Song</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {songslist.map((song, index) => (
                        <TableRow key={index} 
                            className={'songContainer ' + (currentSong === index ? 'selected' : '')} 
                            onDoubleClick={() => SetCurrent(index) } 
                            style={{ cursor: 'pointer' }}
                            hover
                        >
                        <TableCell component="th" scope="row" style={{ width: '10%' }}>
                            {index + 1}
                        </TableCell>
                        <TableCell>
                            <div className="song_details" style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className="song_name">{song.title}</span>
                                <span className="song_artist">{song.artistName}</span>
                            </div>
                        </TableCell>

        
                        <TableCell style={{ width: '10%' }}>
                            <ButtonsBox>
                                <button 
                                    className="action_btn" 
                                    onClick={() => SetCurrent(index) } 
                                >
                                    <IoPlay />
                                </button>
                                <button 
                                    onClick={() => fav()} 
                                    className="favorite_btn"
                                >
                                    <IoHeartOutline />
                                </button>
                            </ButtonsBox>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    )
}

export default PlayList
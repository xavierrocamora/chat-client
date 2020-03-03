import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// using react hook useState

import './Join.css';

const Join = () => {
    //initialize our states to empty strings
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    //button checks if name and/or room are missing before submiting 
    //in order to prevent the event from executing,
    //otherwise passes the name and room data to the link route
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Joining</h1>
                <div>
                    <input placeholder="" 
                            className="joinInput" 
                            type="text" 
                            onChange = {(event)=> setName(event.target.value)} />
                </div>
                <div>
                    <input placeholder=""
                            className="joinInput mt-20" 
                            type="text" 
                            onChange = {(event)=> setRoom(event.target.value)} />
                </div> 
                <Link onClick={event => (!name || !room ) ? event.preventDefault() : null} to={`./chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;
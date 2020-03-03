import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
// we use useState and useEffect react hooks

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        // we get the url (location) and get the parameters attached (search)
        // querystring returns an object with those parameters
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        });

        // using useEffects hook we must return a function
        // used when unmounting the component
        // we use that function to send the signal of disconnecting 
        // from server and turning off the instance

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

        console.log(socket);

        // we only need to render useEffect if the values within 
        // location.search change.
        // without the last part effectUse will render infinite times
        // getting multiple sockets instead of one


    }, [ENDPOINT, location.search]);

    return (
        <h1>Chat</h1>
    )
}

export default Chat;
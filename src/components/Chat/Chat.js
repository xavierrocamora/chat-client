import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
// we use useState and useEffect react hooks

import InfoBar from '../InfoBar/InfoBar'
import './Chat.css'

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';

    // handling how to send join requests
    useEffect(() => {
        // we get the url (location) and get the parameters attached (search)
        // querystring returns an object with those parameters
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {
            
        });
        console.log(socket);
        // using useEffects hook we must return a function
        // used when unmounting the component
        // we use that function to send the signal of disconnecting 
        // from server and turning off the instance

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

        // we only need to render useEffect if the values within 
        // location.search change.
        // without the last part effectUse will render infinite times
        // getting multiple sockets instead of one


    }, [ENDPOINT, location.search]);

    // handling how hear messages requests
    useEffect(() => {
        // we hear for message event from server
        socket.on('message', (message) => {
            // we add the received message to our array of messages state
            setMessages([...messages, message]);
        });

        // we run this useEffect only when the array of messages state changes

    }, [messages]);

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        // we emit the message and clean the message state for the next one
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <input 
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    )
}

export default Chat;
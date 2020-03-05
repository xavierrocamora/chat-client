import React from 'react';

import onLineIcon from '../../icons/onlineIcon.png';
import './RoomUsersContainer.css';

const RoomUsersContainer = ({ users }) => (
    <div className="textContainer">
    {
        users
            ? (
                <div>
                    <h1>People currently chatting:</h1>
                    <div className="activeContainer">
                        <h2>
                            { users.map(( {name} ) => 
                                <div key={name} className="activeItem">
                                    {name}
                                    <img className="onLineIcon" src={onLineIcon} alt="online" />
                                </div>)}
                        </h2>
                    </div>
                </div>
            ) 
            : null
    }   
    </div>
);

export default RoomUsersContainer;



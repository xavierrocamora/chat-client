import React from 'react';

import closeIcon from '../../icons/closeIcon.png';
import onLineIcon from '../../icons/onlineIcon.png';
import './InfoBar.css';

const InfoBar = ({ room }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onLineIcon" src={onLineIcon} alt="online image" />
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/">
                <img src= {closeIcon} alt="close image" />
            </a>
        </div>
    </div>
);

export default InfoBar;
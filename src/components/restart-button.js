import React from 'react';
import "./restart-button.css";

export const RestartButton = ({ onClick, gameOver }) => {

    if (!gameOver) {
        return null;
    }

    return (
        <button className="RestartButton" onClick={onClick}>Играть ещё раз</button>
    );  
}
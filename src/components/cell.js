import React from 'react';
import "./cell.css";

export const Cell = ({ sign, onClick}) => {
    return (
        <button className={"Cell " + sign} onClick={onClick}></button>
    );
}
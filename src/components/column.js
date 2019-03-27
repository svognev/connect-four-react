import React from 'react';
import "./column.css";

export const Column = ({ renderCell, columnLength }) => {

    const cells = []

    for (let i = 0; i < columnLength; i++) {
        cells.push(renderCell(i))
    }

    return (
        <div className="Column">
            { cells }
        </div>
    );

}
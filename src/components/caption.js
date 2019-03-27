import React from 'react';
import "./caption.css";

export const Caption = ({ children }) => {
    return (
        <div className="Caption">
            <h2 className="Caption-Text">
              {children}
            </h2>
        </div>
    );
}
import React from 'react';

const Modal = ({ onClose, dayInfo }) => {
    const { name, maxTemp, minTemp, rain, wind } = dayInfo;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{name}</h2>
                <p>Température maximale: {maxTemp}°C</p>
                <p>Température minimale: {minTemp}°C</p>
                <p>Précipitation: {rain} mm</p>
                <p>Vitesse du vent: {wind} km/h</p>
            </div>
        </div>
    );
};

export default Modal;
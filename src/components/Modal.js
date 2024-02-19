import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import windAnim from '../assets/icons/windAnim.svg';
import temp_min from '../assets/icons/temp_min.svg';
import temp_max from '../assets/icons/temp_max.svg';
import rainIcon from '../assets/icons/rain_mm.svg';
import DetailCard from './DetailCard';

const Modal = ({ onClose, dayInfo }) => {
    const { maxTemp, minTemp, rain, wind } = dayInfo;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}><IoIosCloseCircle /></span>
                {/* <h2>{name}</h2> */}
                <DetailCard iconSrc={temp_max} description="" value={`${maxTemp} °C`}/>
                <DetailCard iconSrc={temp_min} description="" value={`${minTemp} °C`}/>
                <DetailCard iconSrc={rainIcon} description="" value={`${rain} mm`}/>
                <DetailCard iconSrc={windAnim} description="" value={`${wind} km/h`}/>
            </div>
        </div>
    );
};

export default Modal;
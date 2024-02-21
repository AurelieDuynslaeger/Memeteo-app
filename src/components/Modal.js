import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import DetailCard from './DetailCard';

//import des icones
import windAnim from '../assets/icons/windAnim.svg';
import temp_min from '../assets/icons/temp_min.svg';
import temp_max from '../assets/icons/temp_max.svg';
import rainIcon from '../assets/icons/rain_mm.svg';
import feelsLikeIcon from "../assets/icons/feelslike.svg"
import humidityIcon from "../assets/icons/humidity.svg"
import uvIcon from "../assets/icons/uv.svg"
import sunsetIcon from "../assets/icons/sunset.svg";
import sunriseIcon from "../assets/icons/sunrise.svg";

const Modal = ({ onClose, dayInfo }) => {
    //choix des infos que l'on veut mettre dans la modale (dayInfo étant la récup api sur app)
    const { date, maxTemp, minTemp, rain, wind, avgtemp_c, avghumidity, uv, sunrise, sunset } = dayInfo;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}><IoIosCloseCircle /></span>
                <h5>{date}</h5>
                <div className='modal-part'>
                    <DetailCard iconSrc={sunriseIcon} description="" value={`${sunrise}`}/>
                    <DetailCard iconSrc={sunsetIcon} description="" value={`${sunset}`}/>
                    <DetailCard iconSrc={temp_max} description="Max" value={`${maxTemp} °C`}/>
                    <DetailCard iconSrc={temp_min} description="Min" value={`${minTemp} °C`}/>
                    <DetailCard iconSrc={feelsLikeIcon} description="Moy." value={`${avgtemp_c} °C`}/>
                </div>
                <div className='modal-part'>
                    <DetailCard iconSrc={rainIcon} description="" value={`${rain} mm`}/>
                    <DetailCard iconSrc={windAnim} description="Moy" value={`${wind} km/h`}/>
                    <DetailCard iconSrc={humidityIcon} description="" value={`${avghumidity} %`}/>
                    <DetailCard iconSrc={uvIcon} description="" value={`Indice ${uv}`}/>
                </div>
            </div>
        </div>
    );
};

export default Modal;

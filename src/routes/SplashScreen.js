import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo_memeteo.png';
import '../stylesheet/Root.scss';

function SplashScreen() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigate]);
  
    return (
      <div className="SplashScreen-page">
        <img className="LogoMemeteo" src={logo} alt="logo de Memétéo" />
       
      </div>
    );
  }
  
  export default SplashScreen;
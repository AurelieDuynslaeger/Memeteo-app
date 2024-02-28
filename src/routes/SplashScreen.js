import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoNega from '../assets/memteo-logo-base_nega.png';
import '../stylesheet/_splashScreen.scss'

function SplashScreen() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 3000);
  
      return () => clearTimeout(timer);
    }, [navigate]);

    // ajout dynamique de la classe sur le body (problème de margin 0 sinon + de background)
    useEffect(() => {
      // on récupère le tag body
      const body = window.document.getElementsByTagName('body')[0] || null;
  
      // si body existe (cas contraire qui n'arrivera jamais mais bon)
      if (body) {
        // on supprime toutes les classes
        for (let value of body.classList.values()) {
          body.classList.remove(value)
        }
        
        // ici, on ajoute la classe 'dark-mode' ou 'backgroundClass' (pour la couleur dynamique)
        body.classList.add('splashScreen');
      }
    })
  
    return (
      <div className="logo">
        <img className="LogoMemeteo" src={logoNega} alt="logo de Memétéo" />
      </div>
    );
  }
  
  export default SplashScreen;
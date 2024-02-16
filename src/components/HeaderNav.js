import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { FaCheck } from "react-icons/fa";
import Logo from "../assets/logoMemteo.png"
import "../stylesheet/HeaderNav.scss"

export const HeaderNav = ({ onWeatherInput }) => {
  const [city, setCity] = useState('');

  // valeur cible de l'input du header que l'on stocke dans city
  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log("Input value :", value);
    setCity(value);
  };

  //soumission du formulaire ou la props reprends le nom de la city pour la véhiculer sur App
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis", city);
    // Appel de la fonction de gestion de la ville dans l'app component
    onWeatherInput(city); 
    // Effacer l'input après la soumission
    setCity('');
  };

  return (
    <div className="navbar">
      <img src={Logo} alt="Logo Memetéo" className="logo"/>
      <Form layout="inline">
        <Form.Item>
          <Input placeholder="Saisissez une ville..." value={city} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleFormSubmit}>
          <FaCheck color='#51ADCE'/>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HeaderNav;

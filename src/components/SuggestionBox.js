import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function SuggestionBox({ showSuggestions, suggestions, handleSuggestionClick, error }) {

  // Etape 1
  // const fav  = get fav from localstorage
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem("memeteo-favourites-cities")) || []);
  const [isFav, setIsFav] = useState(false);

  //add a fav into localstorage
    const addToFavs = (item) => {
        const newFavouriteList = [...favs, item];
        setFavs(newFavouriteList);
        localStorage.setItem("memeteo-favourites-cities", JSON.stringify([...favs, item]));
        //setIsFav(true);
  } 

 /*  const addToFavs = (item) => {
    setFavs(prevFavs => {
      const updatedFavs = [...prevFavs, item];
      localStorage.setItem("memeteo-favourites-cities", JSON.stringify(updatedFavs));
      return updatedFavs;
    });
  } */

  //remove a fav from localstorage
  const removeFromFavs = (index) => {
    const copyFavs = [...favs]; // Copie du tableau
    copyFavs.splice(index, 1); // On supprime un élément du tableau copyFav à l'indice spécifié par index
    setFavs(copyFavs); // On met à jour l'état products du composant avec la nouvelle valeur copyProducts, déclenchant ainsi une ré-renderisation du composant avec le panier mis à jour.
    localStorage.setItem("memeteo-favourites-cities", JSON.stringify(copyFavs)); // On met à jour la valeur stockée dans le localStorage
  }

  const listFavs = favs.map((item, index) => {
    return (
        <li key={index}>{index} : {item}</li>
    )
})

  // isFav() => { return city in fav }

  // handleFav () => { 
  //  if (!isFav()) {
  //   add to fav > parcourir le tableau des fav et vérifier que l'id ne soit pas dedans
  //  } else {
  //   remove city from fav
  //  }
  //   save fav to local storage
  // }
  

  // Etape 2
  // Merge fav + suggestions (sans les fav)

  return (
    <>{ ((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="suggestions">
          {error && suggestions.length<1 &&  (
            <li className="error">{error}</li>
          )}
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="suggestion"> 
                {item} {/* Here = location name / place name */}
                <span className="fav" onClick={() => addToFavs(item)}><FaRegStar /></span>
                <span className="fav" onClick={() => removeFromFavs(index)}><FaStar /></span>
                { /* Add a span here for fav + class for fav (isFav) */} 
            </li>
          ))}
        </ul>
      )}
      { (suggestions.length < 1) && (
        <ul className="suggestions">
          {listFavs}
        </ul>
      )}
    </>
  )
}
import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function SuggestionBox({ showSuggestions, showFavoris, suggestions, handleSuggestionClick, error,}) {
  // get fav from localstorage
  const [favs, setFavs] = useState(
    JSON.parse(localStorage.getItem("memeteo-favourites-cities")) || []
  );
  const [results, setResults] = useState([]);

  // Ajouter une ville en favori
  const addToFavs = (item) => {
    // Si la ville est déjà en favori (cas qui n'arrivera jamais, à part si l'app lag ou si l'user arrive à double-cliquer)
    if (favs.includes(item)) return; // Ici, on sort de la fonction (comme un break)

    const newFavouriteList = [...favs, item];
    setFavs(newFavouriteList);
    localStorage.setItem("memeteo-favourites-cities", JSON.stringify(newFavouriteList)); // On met à jour le localstorage
  };

  // Supprimer un favori
  const removeFromFavs = (item) => {
    if (!favs.includes(item)) return;

    const newFavs = favs.filter((fav) => fav !== item);
    setFavs(newFavs); // On met à jour l'état, déclenchant ainsi une ré-renderisation du composant
    localStorage.setItem("memeteo-favourites-cities", JSON.stringify(newFavs)); // On met à jour le localStorage
  };

  // Afficher tous les favoris
  const listFavs = favs.map((item, index) => {
    return (
      <li
        key={index}
        onClick={(e) => {
          handleSuggestionClick(item);
        }}
        className="suggestion"
      >
        {index + 1}. {item}
        <span
          className="fav"
          onClick={(e) => {
            e.stopPropagation();
            removeFromFavs(item);
          }}
        >
          <FaStar className="icon" />
        </span>
      </li>
    );
  });

  useEffect(() => {
    // On filtre les résultats pour avoir des objets uniques (éviter les "Paris, United States of America" multiples)
    const res = [...new Set(suggestions)]; 

    // On trie les résultats pour avoir les favoris en premier puis les suggestions
    res.sort((a, b) => {
      return favs.includes(a) ? -1 : favs.includes(b) ? 0 : 1;
    });

    setResults(res);
  }, [suggestions, favs]);

  return (
    <>
      {((showSuggestions && results.length) || error) && (
        <ul className="suggestions">
          {error && results.length < 1 && <li className="error">{error}</li>}
          {/* Afficher les suggestions */}
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="suggestion"
            >
              {item} {/* On affiche le nom de la ville et le pays */}
              {/* Si la ville n'est pas en favori, l'utilisateur peut l'ajouter en favori */}
              {!favs.includes(item) && (
                <span
                  className="fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToFavs(item);
                  }}
                >
                  <FaRegStar className="icon" />
                </span>
              )}
              {/* Si la ville est déjà en favori, l'utilisateur peut la supprimer des favoris */}
              {favs.includes(item) && (
                <span
                  className="fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromFavs(item);
                  }}
                >
                  <FaStar className="icon" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {/* Afficher la liste des favoris */}
      {showFavoris && results.length < 1 && (
        <ul className="suggestions">{listFavs}</ul>
      )}
      {/* Afficher un msg si aucun favori */}
      {showFavoris && results.length < 1 && favs.length === 0 && (
        <p className="suggestions">Aucun favori.</p>
      )}
    </>
  );
}

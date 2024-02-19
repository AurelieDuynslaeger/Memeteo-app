export default function SuggestionBox({ showSuggestions, suggestions, handleSuggestionClick, error }) {

  // Etape 1
  // const fav  = get fav from localstorage

  // isFav() => { return city not in fav }

  // handleFav () => { 
  //  if (isFav()) {
  //   add to fav > parcourir le tableau des fav et vérifier que l'id ne soit pas dedans
  //  } else {
  //   remove city from fav
  //  }
  //   save fav to local storage
  // }
  

  // Etape 2
  // Merge fav + suggestions (sans les fav)

  return (
    <>
      { ((showSuggestions && suggestions.length > 1) || error) && (
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
                { /* Add a span here for fav + class for fav (isFav) */} 
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
export const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  ///convertir le timestamp de l'api, et n'en retirer que l'heure au format hh:mm


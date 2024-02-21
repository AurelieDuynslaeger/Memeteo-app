import { format, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';

///convertir "2024-02-20 00:00" réponse de l'api, et n'en retirer que l'heure au format hh:mm
export const formatTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


// fonction de formattage des am-pm en heures : on récup une chaine de caractères de l'api '06:16 PM'
export const hourConvert = (hour)=> {
  const [time, update] = hour.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (update === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}h${minutes}`;
}


  //formattage du jour (date-fns) isToday
  export const formatDay = (date) => {
    //si la date récupéré est Today alors on affiche 'auj.' au lieu de l'abbraviation du jour
    if(isToday(date)) {
      return 'auj.';
    } else {
      return format(date, 'E',{ locale: fr })
    }
  }
  


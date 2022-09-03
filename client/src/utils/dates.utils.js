export const formatTimeAgo = (postDate) => {
  const timeAgoInMs = Date.now() - new Date(postDate);
  if (timeAgoInMs < 15000) {
    return `Il y a quelques secondes`;
  }
  if (timeAgoInMs < 50000) {
    return `Il y a moins d'une minute`;
  }
  if (timeAgoInMs < 102000) {
    return `Il y a une minute`;
  }
  if (timeAgoInMs < 3570000) {
    return `Il y a ${Math.round(timeAgoInMs / 60000)} minutes`;
  }
  if (timeAgoInMs < 5436000) {
    return `Il y a une heure`;
  }
  if (timeAgoInMs < 84420000) {
    return `Il y a ${Math.round(timeAgoInMs / 3600000)} heures`;
  }
  if (timeAgoInMs < 144000000) {
    return `Il y a un jour`;
  }
  if (timeAgoInMs < 2505600000) {
    return `Il y a ${Math.round(timeAgoInMs / 86400000)} jours`;
  }
  if (timeAgoInMs < 3974400000) {
    return `Il y a un mois`;
  }
  if (timeAgoInMs < 25920000000) {
    return `Il y a ${Math.round(timeAgoInMs / 2629800000)} mois`;
  }
  // if (timeAgoInMs < 3974400000) {
  //   return `Il y a un an`;
  // }
  // if (timeAgoInMs < 50544000000) {
  //   return `Il y a ${Math.round(timeAgoInMs / 31557600000)} ans`;
  // }
  const date = new Date(postDate);
  const formatedDate = date.toLocaleDateString('fr');
  return `Le ${formatedDate}`;
};

export const formatBirthDateText = (date) => {
  const day = date.split('-')[2];
  const month = date.split('-')[1];
  const dayText = day[0] === '0' ? day[1] : day;
  let monthText = '';
  if (month === '01') monthText = 'Janvier';
  if (month === '02') monthText = 'Fevrier';
  if (month === '03') monthText = 'Mars';
  if (month === '04') monthText = 'Avril';
  if (month === '05') monthText = 'Mai';
  if (month === '06') monthText = 'Juin';
  if (month === '07') monthText = 'Juillet';
  if (month === '08') monthText = 'Août';
  if (month === '09') monthText = 'Septembre';
  if (month === '10') monthText = 'Octobre';
  if (month === '11') monthText = 'Novembre';
  if (month === '12') monthText = 'Decembre';
  return `${dayText} ${monthText}`;
};

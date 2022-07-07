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
  //   return `un an`;
  // }
  // if (timeAgoInMs < 50544000000) {
  //   return `${Math.round(timeAgoInMs / 31557600000)} ans`;
  // }
  const date = new Date(postDate);
  const formatedDate = date.toLocaleDateString('fr');
  return `Le ${formatedDate}`;
};

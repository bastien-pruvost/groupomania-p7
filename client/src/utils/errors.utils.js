export const handleError = (error) => {
  if (error.response && error.response.data) {
    // Request Ok and server responded with an error
    console.log(error.response.status, error.response.data);
    throw error.response.data;
  } else {
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Erreur de connexion au serveur');
    } else {
      // Request Ok but no response was received
      throw error;
    }
    // console.log(error.config);
  }
};

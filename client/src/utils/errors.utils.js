export const handleError = (error) => {
  if (error.response && error.response.data) {
    // Request Ok and server responded with an error
    if (error.response.data.message === 'connect ECONNREFUSED 127.0.0.1:3306') {
      throw new Error('Erreur de connexion a la base de données');
    }

    console.log(error.response.status, error.response.data);
    throw error.response.data;
  }

  if (error.code === 'ERR_NETWORK') {
    throw new Error('Erreur de connexion au serveur');
  }

  // Request Ok but no response was received
  throw error;

  // console.log(error.config);
};

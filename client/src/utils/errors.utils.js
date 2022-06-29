export const handleError = (error) => {
  if (error.response) {
    // Request Ok but server responded with an error
    console.log(error.response.status, error.response.data);
  } else if (error.request) {
    // Request Ok but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  // console.log(error.config);
  if (error.response.data) {
    return error.response.data;
  }
};

import axios from 'axios';

// const url = 'https://cohorts-api.herokuapp.com/api';
// const url = 'http://localhost:3335';
const url: string = 'https://mansi-nlp.data.caltimes.io';

/**
 * set baseurl and authentication headers with axios
 *
 * @param {string} apiToken token taken from useQuery sent by overview
 */

function AxiosWithAuth(apiToken: string | null) {
  return axios.create({
    headers: {
      Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`
    },
    baseURL: process.env.REACT_APP_BASE_URL || url
  });
}

export default AxiosWithAuth;

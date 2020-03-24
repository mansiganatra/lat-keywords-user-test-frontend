import axios from 'axios';

// const url = 'https://cohorts-api.herokuapp.com/api';
// const url = 'http://localhost:8000/api';
const url: string = 'http://0.0.0.0:3335';

/**
 * set baseurl and authentication headers with axios
 *
 * @param {string} apiToken token taken from useQuery sent by overview
 */

function AxiosWithAuth(apiToken: string) {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Basic ${btoa(apiToken + ':x-auth-token')}`
    },
    baseURL: url
  });
}

export default AxiosWithAuth;

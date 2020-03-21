import axios from 'axios';

// const url = 'https://cohorts-api.herokuapp.com/api';
// const url = 'http://localhost:8000/api';
const url = 'http://localhost:3555';

/**
 * set baseurl and authentication headers with axios
 *
 * @param {string} apiToken token taken from useQuery sent by overview
 */

function AxiosWithAuth(apiToken) {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authentication: `Basic ${btoa(apiToken + ':x-auth-token')}`
    },
    baseURL: url
  });
}

export default AxiosWithAuth;

import axios from 'axios';

const url = 'https://cohorts-api.herokuapp.com/api';

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    crossdomain: true,
    baseURL: url,
    json: true
  });
};

export default axiosWithAuth;

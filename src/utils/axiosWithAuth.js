import axios from 'axios';

const url1 = 'https://10.23.44.151:80';
const url2 = 'https://cohorts-api.herokuapp.com/api';
const url3 = 'http://ec2-34-220-242-182.us-west-2.compute.amazonaws.com';

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    crossdomain: true,
    baseURL: url2,
    json: true
  });
};

export default axiosWithAuth;

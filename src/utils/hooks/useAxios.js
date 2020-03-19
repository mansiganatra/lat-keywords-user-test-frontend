import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

/**
 *
 * @param {string} method 'post'; 'get'
 * @param {string} endpoint  /upload; /search?term=Trump&documentSetId=21000&size=100
 */

function useAxios(method, endpoint) {
  const [result, setResult] = useState(null);
  let query = useQuery();
  let apiToken = query.get('apiToken');
  let server = query.get('server');
  let selectionId = query.get('selectionId');
  let documentSetId = query.get('documentSetId');

  const payload = {
    documentSetId: documentSetId || '',
    selectionId: selectionId || '',
    server: server || ''
  };

  useEffect(() => {
    if (method === 'get') {
      const res = handleGet(apiToken);
      setResult(res);
    }
    if (method === 'post') {
      const res = handlePost(apiToken, payload);
      console.log('lkjflsj: ', res);
      setResult(res);
    }
  }, []);

  if (typeof method !== 'string') {
    return new Error('Method must be a string');
  }

  if (typeof endpoint !== 'string') {
    return new Error('Endpoint must be a string');
  }

  if (typeof payload !== 'object') {
    return new Error('Payload must be an object');
  }

  const handleGet = async () => {
    const res = await AxiosWithAuth(apiToken).get(endpoint);
    return res;
  };

  /**
   * pass payload to axios 
   * 
   * @param {Object} payload {
                                "documentSetId":21049,
                                "selectionId":"",
                                "server":"https://www.overviewdocs.com"
                              }
   */

  const handlePost = async payload => {
    const res = await AxiosWithAuth().post(endpoint, payload);
    return res;
  };

  return result;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const url = 'https://cohorts-api.herokuapp.com/api';

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
      Authentication: `Basic ${btoa(`${apiToken}:x-auth-token`)}`
    },
    baseURL: url
  });
}

export default useAxios;

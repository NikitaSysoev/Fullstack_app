import axios from 'axios';
export default function Api() {}

Api.url = 'http://localhost:3001/api';

Api.get = async url => {
  const res = await axios(Api.url + url);
  return res.data;
};

Api.post = (url, options) => {
  return axios.post(Api.url + url, options);
};

Api.put = url => {};

Api.delete = url => {};

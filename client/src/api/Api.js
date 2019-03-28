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

Api.isArrayEqual = (arr1, arr2) => {
  return (
    arr1.length === arr2.length && arr1.sort().every((value, index) => value === arr2.sort()[index])
  );
};

Api.getIntRandom = (min, max)=> {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

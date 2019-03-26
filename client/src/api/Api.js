import axios from 'axios';
export default function Api() {}

Api.fetchData = async url => {
  const res = await axios(`http://localhost:3001/api${url}`);
  return res.data;
};

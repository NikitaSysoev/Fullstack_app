import React, { useEffect, useState } from 'react';

import Api from './api/Api';

const App = () => {
  const [data, setData] = useState('...');
  useEffect(() => {
    Api.fetchData('/hello').then(data => setData(data));
  });
  return <div className="App">getting {data}</div>;
};

export default App;

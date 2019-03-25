import React, { useEffect, useState } from "react";
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(()=>{
    axios('http://localhost:3001/api/hello').then(res=>setData(res.data));
  });
  return (
    <div className="App">
      getting {data ? data : '...'}
    </div>
  );
};

export default App;

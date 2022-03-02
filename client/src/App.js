import axios from 'axios';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    axiosTest();
  });
  const axiosTest = () => {
    axios
      .get('')
      .then(res => console.log(res.data).catch(err => console.log(err)));
  };
  return <p>hi</p>;
}

export default App;

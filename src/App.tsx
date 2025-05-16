import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
const fetchData = async () => {
  const res = await axios
    .get(`https://proxyserver2-rho.vercel.app/manga`, {
      params: {},
    })
    .then((res) => res.data)
    .then((res) => console.log(res));
  return res;
};
function App() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  return <></>;
}

export default App;

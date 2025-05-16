import "./App.css";
import { Route, Routes } from "react-router-dom";
import Catalog from "./Pages/Catalog";
import About from "./Pages/About";
import User from "./Pages/User";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;

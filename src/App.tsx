import "./App.css";
import { Route, Routes } from "react-router-dom";
import Catalog from "./Pages/Catalog";
import About from "./Pages/About";
import User from "./Pages/User";
import Header from "./Components/Header";
import MangaById from "./Pages/MangaById";
import MangaReadPage from "./Pages/MangaReadPage";
import Layout from "./Components/Sidebar/LayoutSidebar";
import { MySidebar } from "./Components/Sidebar/indexSidebar";

function App() {
  return (
    <>
      <Header />

      <Layout>
        <MySidebar />

        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="/manga/:id" element={<MangaById />} />
          <Route path="/mangaread/:id" element={<MangaReadPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;

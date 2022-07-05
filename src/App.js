import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreatePage } from "./Pages/CreatePage";

import "./global.css";
import { Home } from "./Pages/Home";
import { DetailsPage } from "./Pages/DetailsPage";
import { EditPage } from "./Pages/EditPage";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-list" element={<CreatePage />} />
        <Route path="/details-list/:id" element={<DetailsPage />} />
        <Route path="/edit-list/:id" element={<EditPage />} />
      </Routes>
      <Footer />
    </>
  );
}

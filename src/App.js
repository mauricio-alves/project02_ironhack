import { Routes, Route } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import "./global.css";

import { CreatePage } from "./Pages/CreatePage";
import { Home } from "./Pages/Home";
import { DetailsPage } from "./Pages/DetailsPage";
import { EditPage } from "./Pages/EditPage";
import { NotFoundPage } from "./Pages/NotFoundPage";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-page" element={<CreatePage />} />
        <Route path="/details-page/:id" element={<DetailsPage />} />
        <Route path="/edit-page/:id" element={<EditPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

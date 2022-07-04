import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreateList } from "./Pages/CreateList";

import "./global.css";
import { Home } from "./Pages/Home";
import { DetailsList } from "./Pages/DetailsList";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-list" element={<CreateList />} />
        <Route path="/details-list/:id" element={<DetailsList />} />
        <Route path="/edit-list/:id" />
      </Routes>
      <Footer />
    </>
  );
}

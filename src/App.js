// import axios from "axios";
// import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CreateList } from "./Pages/CreateList";

import "./global.css";
import { Home } from "./Pages/Home";

export function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-list" element={<CreateList />} />
      </Routes>
      <Footer />
    </>
  );
}

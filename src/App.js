import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

import "./global.css";
import { Home } from "./Pages/Home";

export function App() {
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    async function fetchFruits() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/list-fruits"
        );
        setFruits(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFruits();
  }, []);

  console.log(fruits);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-list" fruits={fruits} setFruits={setFruits} />
      </Routes>
      <Footer />
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardIMC } from "../../components/CardIMC";
import "./style.css";

export function Home() {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    async function fetchList() {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/shopping-list"
      );
      setList(response.data);
    }
    fetchList();
  }, []);

  return (
    <>
      <div id="containerTitleHome">
        <div className="imgGifTitle">.</div>
        <Link id="linkHome" to="/create-page">
          <div id="titleHome">Crie Sua Lista Aqui!</div>
        </Link>
        <div className="imgGifTitle">.</div>
      </div>
      <div id="homeHome">
        <div id="cardImcHome"> {<CardIMC />}</div>
        <div id="homeBody">
          {list.map((currentList) => {
            return (
              <div id="cardUserHome" className="card" key={currentList._id}>
                <div id="card-body">
                  <h5 className="card-title">
                    <b>{currentList.owner}</b>
                  </h5>
                </div>
                <p className="card-text">{currentList.date}</p>
                <div>
                  <Link
                    to={`/details-page/${currentList._id}`}
                    id="btnDetalhes"
                    className="btn"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

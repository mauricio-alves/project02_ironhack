import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardIMC } from "../../components/CardIMC";

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
      <Link to="/create-page">
        <button className="btn btn-primary">Criar lista de compras!</button>
      </Link>
      <CardIMC />
      <div className="d-flex flex-wrap">
        {list.map((currentList) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={currentList._id}
            >
              <div className="card-body">
                <h5 className="card-title">{currentList.owner}</h5>
                <p className="card-text">{currentList.date}</p>
                <Link
                  to={`/details-page/${currentList._id}`}
                  className="btn btn-info"
                >
                  Detalhes
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

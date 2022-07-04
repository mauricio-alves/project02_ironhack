import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  console.log(list);
  return (
    <>
      <Link to="/create-list">
        <button className="btn btn-primary">Criar lista</button>
      </Link>
      {list.map((currentList) => {
        return (
          <div className="card" style={{ width: "18rem" }}>
            {/* <img className="card-img-top" src="..." alt="Card image cap" /> */}
            <div className="card-body">
              <h5 className="card-title">{currentList.owner}</h5>
              <p className="card-text">{currentList.date}</p>
              <a href="/" className="btn btn-info">
                Detalhes
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
}

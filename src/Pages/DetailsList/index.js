import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "../../components/CardFruits";

export function DetailsList() {
  const { id } = useParams();
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/shopping-list/${id}`
        );
        setUserList(response.data.fruits);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, [id]);

  console.log(userList);

  return loading ? (
    <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  ) : (
    <>
      <div>
        <div>
          <h1>Lista de: {userList.owner}</h1>
          <h2>Título da lista: {userList.date}</h2>
          <div>
            <Link to={`/edit-list/${id}`} className="btn btn-success mb-3">
              Editar lista
            </Link>
            <button className="btn btn-danger mb-3 ms-3">Deletar lista</button>
          </div>
        </div>
      </div>
      <div>
        {userList.map((currentFruit) => {
          return <Card props={currentFruit} />;
        })}
      </div>
    </>
  );
}

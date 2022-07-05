import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/CardFruits";

export function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userList, setUserList] = useState([{ fruits: []}]);
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

  async function handleDelete() {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/shopping-list/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  console.log(userList);
  return loading ? (
    <div className="spinner-border text-danger" role="status"></div>
  ) : (
    <>
      <div>
        <div>
          <h1>Lista de: {userList.owner}</h1>
          <h2>Criada em: {userList.date}</h2>
          <div>
            <Link to={`/edit-page/${id}`} className="btn btn-success mb-3">
              Editar lista
            </Link>
            <button onClick={handleDelete} className="btn btn-danger mb-3 ms-3">
              Deletar lista
            </button>
          </div>
        </div>
      </div>
      <div>
        {userList.fruits.map((currentFruit) => {
          return <Card props={currentFruit} key={currentFruit._id} />;
        })}
      </div>
    </>
  );
}

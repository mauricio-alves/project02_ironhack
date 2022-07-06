import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/CardFruits";
import "./style.css";
import home from "../../assets/images/home.png";

export function DetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userList, setUserList] = useState({ fruits: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/shopping-list/${id}`
        );
        setUserList(response.data);
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
        <div id="infosDetails">
          <Link to="/">
            <img className="backHome" src={home} alt="back to home" />
          </Link>
          <h1>
            Criado por:<b> {userList.owner}</b>
          </h1>
          <h2>Em: {userList.date}</h2>
          <div>
            <Link
              id="editButton"
              to={`/edit-list/${id}`}
              className="btn btn-success mb-3"
            >
              Editar lista
            </Link>
            <button
              id="deleteButton"
              onClick={handleDelete}
              className="btn btn-danger mb-3 ms-3"
            >
              Deletar lista
            </button>
          </div>
        </div>
      </div>
      <div id="userListCards">
        {userList.fruits.map((currentFruit) => {
          return <Card props={currentFruit} key={currentFruit._id} />;
        })}
      </div>
    </>
  );
}

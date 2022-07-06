import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Card } from "../../components/CardFruits";
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
        navigate("error");
      }
    }
    fetchUserList();
  }, [id, navigate]);

  async function handleDelete() {
    try {
      await axios.delete(`https://ironrest.herokuapp.com/shopping-list/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  
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
              to={`/edit-page/${id}`}
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
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Fruta</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Calorias</th>
            <th scope="col">Carboidratos</th>
            <th scope="col">Fibras</th>
          </tr>
        </thead>
      </table>
      {userList.fruits.map((currentFruit) => {
        return (
          <>
            <div id="tableDetailsMain">
              <div className="tableName">{currentFruit.name}</div>
              <div className="tableUnity">{currentFruit.unity}</div>
              <div className="tableCalories">
                {(
                  currentFruit.unity * currentFruit.nutritions.calories
                ).toFixed(0)}
              </div>
              <div className="tableCarbohydrates">
                {(
                  currentFruit.unity * currentFruit.nutritions.carbohydrates
                ).toFixed(1)}
              </div>
              <div className="tableFiber">
                {(currentFruit.unity * currentFruit.nutritions.fiber).toFixed(
                  1
                )}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

{
  /* <Card props={currentFruit} key={currentFruit._id} />
                <div id="quantidadeDetails">
                  <h5>Quantidade: {currentFruit.unity}</h5>
                </div> */
}

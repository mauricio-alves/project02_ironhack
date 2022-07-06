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
  let totalCal = 0;
  let totalCarbo = 0;
  let totalFiber = 0;

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
            <b> {userList.owner}</b>
          </h1>
          <h2>
            <b>{userList.date}</b>
          </h2>
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
      <div id="headerTable">
        <table className="table table-striped">
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
      </div>

      {userList.fruits.map((currentFruit) => {
        totalCal =
          totalCal + currentFruit.nutritions.calories * currentFruit.unity;

        totalCarbo =
          totalCarbo +
          currentFruit.nutritions.carbohydrates * currentFruit.unity;

        totalFiber =
          totalFiber + currentFruit.nutritions.fiber * currentFruit.unity;

        console.log(totalCarbo);
        console.log(totalCal);
        console.log(totalFiber);
        return (
          <div key={currentFruit._id}>
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
          </div>
        );
      })}
      <div id="total">
        <div id="totalTitle">
          <h3>Total</h3>
        </div>
        <div id="totalCal">{totalCal.toFixed(0)}</div>
        <div id="totalCarbo">{totalCarbo.toFixed(1)}</div>
        <div id="totalFiber">{totalFiber.toFixed(1)}</div>
      </div>
    </>
  );
}

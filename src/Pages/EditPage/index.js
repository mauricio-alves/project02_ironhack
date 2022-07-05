import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card } from '../../components/CardFruits';

export function EditPage() {
  const { id } = useParams();
  const [userList, setUserList] = useState({ fruits: []});

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/shopping-list/${id}`
        );
        setUserList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, [id]);
  console.log(userList)

  return (
    <>
      <div>
        <div>
          <h1>Lista de: {userList.owner}</h1>
          <h2>Criada em: {userList.date}</h2>
          <div>
            <Link to={`/edit-page/${id}`} className="btn btn-success mb-3">
              Salvar lista
            </Link>
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

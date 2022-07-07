import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Card } from "../../components/CardFruits";
import { Toaster, toast } from "react-hot-toast";
import { Search } from "../../components/Search";
import "./style.css";
import home from "../../assets/images/home.png";

export function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [fruits, setFruits] = useState([]);
  const [unity, setUnity] = useState(1);
  const [form, setForm] = useState({
    owner: "",
    date: "",
    fruits: [],
  });

  useEffect(() => {
    async function fetchFruits() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/allfruits"
        );
        setFruits(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFruits();
  }, []);

  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get(
          `https://ironrest.herokuapp.com/shopping-list/${id}`
        );
        setForm(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserList();
  }, [id]);

  function handleUnity(event) {
    setUnity(event.target.value);
  }

  function handleChange(event) {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleAddFruit(currentFruit) {
    currentFruit.unity = unity;
    setForm({
      ...form,
      fruits: [...form.fruits, currentFruit],
    });
    toast.success("Fruta adicionada à sua lista!");
  }

  function handleDelete(fruit) {
    const clone = { ...form };
    const updatedList = clone.fruits.filter((currentFruit) => {
      return fruit !== currentFruit;
    });

    setForm({ ...form, fruits: updatedList });
    toast.error("Fruta removida da sua lista!");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const clone = { ...form };
      delete clone._id;
      await axios.put(
        `https://ironrest.herokuapp.com/shopping-list/${id}`,
        clone
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function addedFruits(element) {
    setFruits(fruits.filter((currentFruit) => currentFruit.id !== element.id));
  }

  // function deletedFruits(element) {
  //   setFruits(...fruits, element);
  //   console.log(fruits);
  // }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form>
        <div id="formEditPage">
          <Link id="backHomeCreate" to="/">
            <img className="backHome" src={home} alt="back to home" />
          </Link>
          <div>
            <label htmlFor="input-name">Nome: </label>
            <input
              id="input-name"
              type="text"
              name="owner"
              value={form.owner}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="input-date">Data: </label>
            <input
              id="input-date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button
            id="btnSalvarEditPage"
            type="submit"
            className="btn btn-success mb-3"
            onClick={handleSubmit}
          >
            Salvar lista
          </button>
        </div>
      </form>

      <div id="cardsEditPage">
        {form.fruits.map((currentFruit) => {
          return (
            <div key={currentFruit._id}>
              <Card props={currentFruit} />

              <button
                id="btnDeleteEditPage"
                onClick={() => {
                  handleDelete(currentFruit);
                  // deletedFruits(currentFruit);
                }}
                className="btn btn-danger"
              >
                Deletar item
              </button>
            </div>
          );
        })}
      </div>
      <div id="searchBar">
        <Search search={search} setSearch={setSearch} />
      </div>
      <div id="bodyCreate">
        {fruits
          .filter((currentFruit) => {
            return currentFruit.name
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentFruit) => {
            return (
              <div id="cardsCreate" key={currentFruit._id}>
                <Card props={currentFruit} handleUnity={handleUnity}></Card>
                <div id="footerCard">
                  <div id="miniFooter">
                    <label htmlFor="quantity">
                      <b>Quantidade:</b>
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      value={currentFruit.unity}
                      onChange={handleUnity}
                    />
                  </div>
                  <button
                    className="btn btn-outline-info"
                    id="buttonAdd"
                    onClick={() => {
                      handleAddFruit(currentFruit);
                      addedFruits(currentFruit);
                    }}
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

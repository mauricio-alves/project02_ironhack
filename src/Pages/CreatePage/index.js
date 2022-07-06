import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/CardFruits";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { Toaster, toast } from "react-hot-toast";
import home from "../../assets/images/home.png";

export function CreatePage() {
  const [search, setSearch] = useState("");
  const [fruits, setFruits] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    date: "",
    fruits: [],
  });

  const navigate = useNavigate();

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

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("https://ironrest.herokuapp.com/shopping-list", form);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      {/* <div id="headerCreateFirst">
        
        <h1 id="titleCreateList">Crie Sua Lista de Compras</h1>
      </div> */}

      <form>
        <div id="headerCreate">
          <Link id="backHomeCreate" to="/">
            <img className="backHome" src={home} alt="back to home" />
          </Link>
          <div>
            {" "}
            <label htmlFor="owner-input">Nome: </label>
            <input
              id="owner-input"
              type="text"
              name="owner"
              value={form.owner}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date-input">Data: </label>
            <input
              id="date-input"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button
            id="buttonCriar"
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Criar
          </button>
        </div>
      </form>
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
                <Card props={currentFruit}></Card>
                <div id="footerCard">
                  <div id="miniFooter">
                    <label htmlFor="quantity">
                      <b>Quantidade:</b>
                    </label>
                    <input
                      id="quantity"
                      type="number"
                      name="quantity"
                      value={form.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="btn btn-outline-info"
                    id="buttonAdd"
                    onClick={() => {
                      setForm({
                        ...form,
                        fruits: [...form.fruits, currentFruit],
                      });
                      toast.success("Fruta adicionada à sua lista!");
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

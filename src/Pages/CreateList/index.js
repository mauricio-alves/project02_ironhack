import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card } from "../../components/CardFruits";
import { useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
// import { Toaster, toast } from "react-hot-toast";

export function CreateList() {
  const [search, setSearch] = useState("");
  const [fruits, setFruits] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    date: "",
    quantity: 0,
    fruits: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFruits() {
      try {
        const response = await axios.get(
          "https://ironrest.herokuapp.com/list-fruits"
        );
        setFruits(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFruits();
  }, []);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post(" https://ironrest.herokuapp.com/shopping-list", form);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Crie Sua Lista de Compras</h1>
      <form>
        <label htmlFor="owner-input">Nome :</label>
        <input
          id="owner-input"
          type="text"
          name="owner"
          value={form.owner}
          onChange={handleChange}
        />

        <label htmlFor="date-input">Data :</label>
        <input
          id="date-input"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Criar
        </button>
      </form>
      <Search search={search} setSearch={setSearch} />
      <div id="bodyCreate">
        {fruits
          .filter((currentFruit) => {
            return currentFruit.name
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((currentFruit) => {
            return (
              <>
                <div id="cardsCreate">
                  <Card props={currentFruit}></Card>
                  <div id="footerCard">
                    <div id="miniFooter">
                      <label htmlFor="quantity">
                        <b>Quantidade :</b>
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
                      }}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
}

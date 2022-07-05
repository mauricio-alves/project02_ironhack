import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/CardFruits";
import { useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { Toaster, toast } from "react-hot-toast";

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
          "https://ironrest.herokuapp.com/list-fruits"
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
              <div id="cardsCreate" key={currentFruit._id}>
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

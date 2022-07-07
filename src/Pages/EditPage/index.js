import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/CardFruits";
import { Toaster, toast } from "react-hot-toast";
import { Search } from "../../components/Search";
import "./style.css";

export function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [fruits, setFruits] = useState([]);
  const [unity, setUnity] = useState(0);
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

  function deletedFruits(currentFruit) {
    setFruits({
      ...fruits,
      fruits: [...fruits, currentFruit],
    });
    console.log(fruits);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      ''
      <form
        style={{ maxWidth: "700px", marginLeft: "250px", marginBottom: "20px" }}
      >
        <div className="mb-3">
          <label htmlFor="input-name" className="form-label">
            Altere seu nome:
          </label>
          <input
            value={form.owner}
            type="text"
            name="owner"
            className="form-control"
            id="input-name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="input-title" className="form-label">
            Altere a data:
          </label>
          <input
            id="date-input"
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
                  deletedFruits(currentFruit);
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
        {console.log(fruits)}
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
                  {console.log(fruits)}
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

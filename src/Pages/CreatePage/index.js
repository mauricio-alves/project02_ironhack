import "./style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../../components/CardFruits";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "../../components/Search";
import { Toaster, toast } from "react-hot-toast";
import home from "../../assets/images/home.png";

export function CreatePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [fruits, setFruits] = useState([]);
  const [form, setForm] = useState({
    owner: "",
    date: "",
    fruits: [],
  });

  const [unity, setUnity] = useState(1);

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

  function handleUnity(event) {
    setUnity(event.target.value);
  }

  function handleAddFruit(currentFruit) {
    currentFruit.unity = unity;
    setForm({
      ...form,
      fruits: [...form.fruits, currentFruit],
    });
    toast.success("Fruta adicionada à sua lista!");
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

  function addedFruits(element) {
    setFruits(fruits.filter((currentFruit) => currentFruit.id !== element.id));
  }

  function handleSortAlphabetic() {
    const clone = [...fruits].sort((a, b) => a.name.localeCompare(b.name));
    setFruits(clone);
  }

  function handleByFiber() {
    const clone = [...fruits].sort(
      (a, b) => b.nutritions.fiber - a.nutritions.fiber
    );
    setFruits(clone);
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <form>
        <div id="headerCreate">
          <Link id="backHomeCreate" to="/">
            <img className="backHome" src={home} alt="back to home" />
          </Link>
          <div>
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
        <div className="sort">
          <span>Ordernar por:</span>
          <button
            className="btn btn-light sort-btn"
            onClick={handleSortAlphabetic}
          >
            Nome
          </button>
          <button className="btn btn-light sort-btn" onClick={handleByFiber}>
            Fibras
          </button>
        </div>
        <div>
          <Search search={search} setSearch={setSearch} />
        </div>
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
                      placeholder="0"
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

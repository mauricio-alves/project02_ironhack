import "./style.css";

export function Card({ props }) {
  return (
    <>
      <div id="cardFruit">
        <div id="card">
          <img id="card-img-top" src={props.image} alt="imagecard" />
          <div className="card-body">
            <h3 id="nameFruit">{props.name}</h3>
            <hr></hr>
            <div id="footer">
              <h5>Tabela Nutricional (100gr)</h5>
              <p className="card-calories">
                Calorias: <b>{props.nutritions.calories} Kcal</b>
              </p>
              <p className="card-carbo">
                Carboidratos: <b>{props.nutritions.carbohydrates} g</b>
              </p>
              <p className="card-fat">
                Fibras: <b>{props.nutritions.fiber} g</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

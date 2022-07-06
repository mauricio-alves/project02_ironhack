import "./style.css";

export function Card({ props }) {
  return (
    <>
      <div id="cardFruit">
        <div className="" style={{ width: "320px" }}>
          <img className="card-img-top" src={props.image} alt="imagecard" />
          <div className="card-body">
            <h3 id="nameFruit">{props.name}</h3>
            <hr></hr>
            <div id="footer">
              <h4>Tabela Nutricional (100gr):</h4>
              <label>Calorias:</label>
              <p className="card-calories">{props.nutritions.calories} Kcal</p>
              <label>Carboidratos:</label>
              <p className="card-carbo">{props.nutritions.carbohydrates}g</p>
              <label>Fibras:</label>
              <p className="card-fat">{props.nutritions.fiber}g</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

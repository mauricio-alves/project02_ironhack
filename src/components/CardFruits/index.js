import "./style.css";

export function Card({ props, quant }) {
  return (
    <>
      <div id="cardFruit">
        <div className="" style={{ width: "320px" }}>
          <img className="card-img-top" src={props.image} alt="imagecard" />
          <div className="card-body">
            <h3 id="nameFruit">{props.name}</h3>
            <hr></hr>
            {/* <p className="card-text">{props.family}</p> */}
            <div id="footer">
              <h4>Tabela Nutricional</h4>
              <label>Carboidratos :</label>
              <p className="card-carbo">{props.nutritions.carbohydrates}</p>
              <label>Calorias :</label>
              <p className="card-calories">{props.nutritions.calories}</p>
              <label>Gorduras :</label>
              <p className="card-fat">{props.nutritions.fat}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

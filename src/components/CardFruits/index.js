import "./style.css";

export function Card({ props, quant }) {
  return (
    <>
      <div id="cardFruit">
        <div className="card" style={{ width: "300px" }}>
          <img className="card-img-top" src={props.image} alt="imagecard" />
          <div className="card-body">
            <h4 id="titleMovie">{props.name}</h4>
            <hr></hr>
            <p className="card-text">{props.family}</p>
            <div id="footer">
              <h3>Tabela Nutricional</h3>
              <p className="card-carbo">{props.nutritions.carbohydrates}</p>
              <p className="card-calories">{props.nutritions.calories}</p>
              <p className="card-fat">{props.nutritions.fat}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

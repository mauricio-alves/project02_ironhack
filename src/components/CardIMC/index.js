import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import imcIcon from "../../assets/images/imc-icon.png";

export function CardIMC() {
  const [calculate, setCalculate] = useState({
    peso: 0,
    altura: 0,
  });

  function handleChange(event) {
    event.preventDefault();
    setCalculate({ ...calculate, [event.target.name]: event.target.value });
  }

  function handleCalc(event) {
    event.preventDefault();
    const result = calculate.peso / (calculate.altura * calculate.altura);

    if (result < 18.5) {
      return toast(
        <p>
          Seu IMC é: <strong>{result.toFixed(2)} kg/m²</strong>. Cuidado! Você
          está abaixo do peso adequado! Capriche nas frutas! 😱🍍
        </p>,
        {
          duration: 8000,
        }
      );
    } else if (result < 25) {
      return toast(
        <p>
          Seu IMC é: <strong>{result.toFixed(2)} kg/m²</strong>. Parabéns! Você
          está no peso adequado! Merece até uma fruta! 😍🍎
        </p>,
        {
          duration: 8000,
        }
      );
    } else {
      return toast(
        <p>
          Seu IMC é: <strong>{result.toFixed(2)} kg/m²</strong>. Cuidado! Você
          está acima do peso adequado! Diminua os carboidratos! 😨
        </p>,
        {
          duration: 8000,
        }
      );
    }
  }

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div id="cardIMC">
        <div id="card">
          <div>
            <div className="card-body">
              <h3>Descubra seu IMC</h3>
              <img src={imcIcon} alt="emoji" />
            </div>
            <hr></hr>
            <div>
              <label htmlFor="peso-input">Peso:</label>
              <input
                id="peso-input"
                type="number"
                name="peso"
                value={calculate.peso}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="altura-input">Altura:</label>
              <input
                id="altura-input"
                type="number"
                name="altura"
                value={calculate.altura}
                onChange={handleChange}
              />
              <br />
              <button onClick={handleCalc} className="btn btn-dark">
                Calcular
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

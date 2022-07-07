import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import imcIcon from "../../assets/images/imc-icon.png";
import "./style.css";

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
        `Seu IMC é: ${result.toFixed(
          2
        )} kg/m². Cuidado! Você está abaixo do peso adequado! Capriche nas frutas! ^^`,
        {
          duration: 8000,
        }
      );
    } else if (result < 25) {
      return toast(
        `Seu IMC é: ${result.toFixed(
          2
        )} kg/m². Parabéns! Você está no peso adequado! Merece até uma fruta! ;D`,
        {
          duration: 8000,
        }
      );
    } else {
      return toast(
        `Seu IMC é: ${result.toFixed(
          2
        )} kg/m². Cuidado! Você está acima do peso adequado! Diminua os carboidratos urgente! :O`,
        {
          duration: 8000,
        }
      );
    }
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="cardIMC">
        <div id="headerCalcImc">
          <img id="emoji" src={imcIcon} alt="emoji" />
          <h4 id="calculeImc">Calcule Seu IMC</h4>
          <hr></hr>
        </div>

        <div id="infoUserImc">
          <label className="labelImc" htmlFor="peso-input">
            Peso:
          </label>
          <input
            className="inputImc"
            id="peso-input"
            type="number"
            name="peso"
            value={calculate.peso}
            onChange={handleChange}
          />
          <br />
          <label className="labelImc" htmlFor="altura-input">
            Altura:
          </label>
          <input
            className="inputImc"
            id="altura-input"
            type="number"
            name="altura"
            value={calculate.altura}
            onChange={handleChange}
          />
          <br />
          <button id="btnCalc" onClick={handleCalc} className="btn btn-dark">
            Calcular
          </button>
        </div>
      </div>
    </>
  );
}

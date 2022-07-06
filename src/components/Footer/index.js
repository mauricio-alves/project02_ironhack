import fruitsIcon from "../../assets/images/fruit-icon.jpg";
import style from "./footer.module.css";

export function Footer() {
  return (
    <div className={style.container}>
      <img src={fruitsIcon} alt="fruits banner" />
      Fruits List ©
    </div>
  );
}

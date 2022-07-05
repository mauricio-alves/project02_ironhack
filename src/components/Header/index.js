import fruitsBanner from "../../assets/images/fruits.png";
import style from "./header.module.css";

export function Header() {
  return (
    <div className={style.container}>
      <img src={fruitsBanner} alt="fruits banner" />
    </div>
  );
}

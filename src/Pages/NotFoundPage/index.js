import { Link } from "react-router-dom";
import notFoundImg from "../../assets/images/error-404.png";
import home from "../../assets/images/home.png";
import "./style.css";

export function NotFoundPage() {
  return (
    <div>
      <div className='homeIcon'>
        <Link to="/">
          <img className="backHome" src={home} alt="back to home" />
        </Link>
      </div>
      <div className='image'>
        <img src={notFoundImg} alt="not found" />
      </div>
    </div>
  );
}

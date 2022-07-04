import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Link to="/create-list">
        <button className="btn btn-primary">Criar lista</button>
      </Link>
    </>
  );
}

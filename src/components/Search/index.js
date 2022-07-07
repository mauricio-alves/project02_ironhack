import "./style.css";
export function Search({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <input
        id="search-input"
        type="text"
        name="name"
        value={search}
        onChange={handleChange}
        placeholder='Procure a fruta'
      />
    </>
  );
}

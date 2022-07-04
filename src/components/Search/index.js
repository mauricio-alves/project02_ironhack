export function Search({ search, setSearch }) {
  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <>
      <label htmlFor="search-input">Procure pelo nome: </label>
      <input
        id="search-input"
        type="text"
        name="name"
        value={search}
        onChange={handleChange}
      />
    </>
  );
}

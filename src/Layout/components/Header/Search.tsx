import React from "react";

const Search = () => {
  const [search, setSearch] = React.useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  return (
    <div className="search w-100 position-relative">
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="Enter your search..."
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;

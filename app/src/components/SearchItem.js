import React from "react";


function SearchItem({ search, setSearch }) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault(e);
        }}
      >
        <input type="text" />
        <div className="card add">
          <div className="cb-container">
            <button id="add-btn">+</button>
          </div>
          <div className="txt-container">
            <input
              type="text"
              className="txt-input"
              placeholder="Search any Item..."
              spellCheck="false"
              autoComplete="off"
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchItem;

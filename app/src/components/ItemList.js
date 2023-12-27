import React from "react";
import Item from "./Item";

function ItemList({ items, setItems, handleClick, handleDelete }) {
  return (
    <ul key={items._id} className="todos">
      {items.map((item) => {
        return <Item key={items._id} items={item} setItems={setItems} handleClick={handleClick} handleDelete={handleDelete} />;
      })}
    </ul>
  );
}

export default ItemList;
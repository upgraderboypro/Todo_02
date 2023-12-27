import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

function Item({items, setItems, handleClick, handleDelete}) {
  return (
    <>
        <li style={{display: "flex",flexDirection: "row", alignItems: "baseline"}} className="card" key={items._id}>
        <div className="cb-container">
          <input type="checkbox" className="cb-input"
          name="check"
          checked={items.checked}
          onChange={() => handleClick(items._id)} />
          <span className="check"></span>
        </div>
        <p className="item" style={items.checked ? { textDecoration: "line-through" } : null}>{items.item}</p>
        <button className="clear" onClick={() => handleDelete(items._id)}>
          <FaTrashAlt style={{color: "yellow"}} />
        </button></li>
    </>
  )
}

export default Item
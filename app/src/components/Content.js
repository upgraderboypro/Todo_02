import React from 'react'
import ItemList from './ItemList'

function Content({items, setItems, handleClick, handleDelete}) {
  return (
    <>
        {items.length ? <ItemList items={items} setItems={setItems} handleClick={handleClick} handleDelete={handleDelete} /> : <p className="content">Empty List Items :(</p>}
    </>
  )
}

export default Content
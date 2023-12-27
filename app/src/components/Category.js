import React from 'react'

function Category({items, delAll}) {
  return (
    <>
        <div className="card stat">
        <p className="corner"><span id="items-left">{items}</span> items left</p>
        <div className="filter">
          <button id="all" className="on">All</button>
          <button id="active">Active</button>
          <button id="completed">Completed</button>
        </div>
        <div className="corner">
          <button id="clear-completed" onClick={delAll}>Clear Completed</button>
        </div>
      </div>
    </>
  )
}

export default Category
import React from "react";

function AddItem({ newItem, setNewItem, submitHandler }) {
  return (
    <>
      <form onSubmit={(e)=>{submitHandler(e)}}>
        <input type="text" />
        <div className="card add">
        <div className="cb-container">
          <button id="add-btn">+</button>
        </div>
        <div className="txt-container">
          <input
            type="text"
            className="txt-input"
            placeholder="Create a new todo..."
            spellCheck="false"
            autoComplete="off"
             value={newItem} onChange={(e)=>{setNewItem(e.target.value)}}
          />
        </div>
      </div>
      </form>
      
    </>
  );
}

export default AddItem;

import React from "react";
import Popup from "reactjs-popup";
import "../../node_modules/bootstrap/dist/css/bootstrap-grid.min.css";
import Auth from "./Auth";
import { MdAccountCircle } from "react-icons/md";
function Header() {
  return (
    <header className="card">
      <h1>TODO</h1>
      <button id="theme-switcher">
        <Popup
          trigger={
            <button className="btn btn-sm btn-primary text-white">
              <MdAccountCircle style={{ color: "yellow", fontSize: "4rem" }} />
            </button>
          }
          modal
          nested
        >
          {(close) => <Auth />}
        </Popup>
      </button>
    </header>
  );
}

export default Header;

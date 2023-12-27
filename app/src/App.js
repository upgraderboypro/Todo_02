import { useEffect, useState } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import Category from "./components/Category";
import apiRequest from "./components/ApiRequest";

function App() {
  const API_URL = "http://localhost:4000/todo";
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("list")) || []
  );

  useEffect(() => {
    if (!localStorage.getItem("list"))
      localStorage.setItem("list", JSON.stringify([]));
    const fetchItem = async () => {
      const listItems = localStorage.getItem("list");
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch(API_URL, {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
          if (!response.ok) throw Error("Server not sending any data to you");
          const listItems = await response.json();
          // console.log(listItems);
          localStorage.setItem("list", JSON.stringify(listItems));
          setItems(listItems);
        }
        setFetchError(null);
      } catch (error) {
        // console.log(error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => (async () => await fetchItem())(), 1000);
  }, []);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1]._id + 1 : 1;
    if (localStorage.getItem("token")) {
      var myNewItem = { checked: false, item };
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(myNewItem),
      };
      const result = await apiRequest(API_URL, postOptions);
      const _id = result._id;
      console.log('result',await result)
      // if (result) setFetchError(result);
        myNewItem = { checked: false, item, _id };
      const listItems = [...items, myNewItem];
      localStorage.setItem("list", JSON.stringify(listItems));
      setItems(listItems);
    } else {
      const myNewItem = { checked: false, item, _id: id };
      const listItems = [...items, myNewItem];
      localStorage.setItem("list", JSON.stringify(listItems));
      setItems(listItems);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleClick = async (id) => {
    // console.log(id);
    const listItems = items.map((item) => {
      return item._id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(listItems);
    const myItem = listItems.filter((item) => item._id === id);
    localStorage.setItem("list", JSON.stringify(listItems));
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    // if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    // console.log(id);
    const listItems = items.filter((item) => item._id !== id);
    // console.log(listItems);
    setItems(listItems);
    localStorage.setItem("list", JSON.stringify(listItems));
    const deleteOptions = { method: "DELETE" };

    if (localStorage.getItem("token")) {
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
    }
  };
  const delAll = async ()=>{
    setItems([])
    localStorage.setItem("list", JSON.stringify([]));
  }
  return (
    <>
      <div className="App">
        <Header />
        <SearchItem search={search} setSearch={setSearch} />
        <AddItem
          newItem={newItem}
          setNewItem={setNewItem}
          submitHandler={submitHandler}
        />
        {isLoading && <p className="loading">Loading List 😎</p>}
        {fetchError && <p className="err">{`Error: ${fetchError}`}</p>}
        <Content
          items={items.filter((item) =>
            item.item.toLowerCase().includes(search.toLowerCase())
          )}
          handleClick={handleClick}
          handleDelete={handleDelete}
        />
        <Category items={items.length} delAll={delAll} />
        <Footer />
      </div>
    </>
  );
}

export default App;

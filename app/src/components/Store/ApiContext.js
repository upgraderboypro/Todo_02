// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiRequest from "../ApiRequest";
// const ApiProvider = createContext();
// function ApiContext({ children }) {
//     const API_URL = "http://localhost:4000/todo";
//     const [isLoading, setIsLoading] = useState(true);
//     const [fetchError, setFetchError] = useState(null);
//     const [search, setSearch] = useState("");
//     const [newItem, setNewItem] = useState("");
//     const [items, setItems] = useState(
//       JSON.parse(localStorage.getItem("list")) || []
//     );
//     useEffect(()=>{setItems(items.filter((item) =>
//         item.item.toLowerCase().includes(search.toLowerCase())
//       ))}, [items, search])
//     const addItem = async (item) => {
//         const id = items.length ? items[items.length - 1]._id + 1 : 1;
//         if (localStorage.getItem("token")) {
//           var myNewItem = { checked: false, item };
//           const postOptions = {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "auth-token": localStorage.getItem("token"),
//             },
//             body: JSON.stringify(myNewItem),
//           };
//           const result = await apiRequest(API_URL, postOptions);
//           const _id = result._id;
//           console.log('result',await result)
//           // if (result) setFetchError(result);
//             myNewItem = { checked: false, item, _id };
//           const listItems = [...items, myNewItem];
//           localStorage.setItem("list", JSON.stringify(listItems));
//           setItems(listItems);
//         } else {
//           const myNewItem = { checked: false, item, _id: id };
//           const listItems = [...items, myNewItem];
//           localStorage.setItem("list", JSON.stringify(listItems));
//           setItems(listItems);
//         }
//       };

      
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!newItem) return;
//     addItem(newItem);
//     setNewItem("");
//   };

//   const handleClick = async (id) => {
//     // console.log(id);
//     const listItems = items.map((item) => {
//       return item._id === id ? { ...item, checked: !item.checked } : item;
//     });
//     setItems(listItems);
//     const myItem = listItems.filter((item) => item._id === id);
//     localStorage.setItem("list", JSON.stringify(listItems));
//     const updateOptions = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ checked: myItem[0].checked }),
//     };
//     const reqUrl = `${API_URL}/${id}`;
//     const result = await apiRequest(reqUrl, updateOptions);
//     // if (result) setFetchError(result);
//   };

//   const handleDelete = async (id) => {
//     // console.log(id);
//     const listItems = items.filter((item) => item._id !== id);
//     // console.log(listItems);
//     setItems(listItems);
//     localStorage.setItem("list", JSON.stringify(listItems));
//     const deleteOptions = { method: "DELETE" };

//     if (localStorage.getItem("token")) {
//       const reqUrl = `${API_URL}/${id}`;
//       const result = await apiRequest(reqUrl, deleteOptions);
//       if (result) setFetchError(result);
//     }
//   };
//   const delAll = async ()=>{
//     setItems([])
//     localStorage.setItem("list", JSON.stringify([]));
//     if (localStorage.getItem("token")) {
//       const reqUrl = `${API_URL}/delAll`;
//       const deleteOptions = { method: "DELETE" };
//       const result = await apiRequest(reqUrl, deleteOptions);
//       if (result) setFetchError(result);
//     }
//   }
//   useEffect(() => {
//     if (!localStorage.getItem("list"))
//       localStorage.setItem("list", JSON.stringify([]));
//     const fetchItem = async () => {
//       const listItems = localStorage.getItem("list");
//       try {
//         if (localStorage.getItem("token")) {
//           const response = await fetch(API_URL, {
//             headers: {
//               "Content-Type": "application/json",
//               "auth-token": localStorage.getItem("token"),
//             },
//           });
//           if (!response.ok) throw Error("Plz., authenticate using a valid token");
//           const listItems = await response.json();
//           // console.log(listItems);
//           localStorage.setItem("list", JSON.stringify(listItems));
//           setItems(listItems);
//         }
//         setFetchError(null);
//       } catch (error) {
//         // console.log(error.message);
//         setFetchError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     setTimeout(() => (async () => await fetchItem())(), 1000);
//   }, []);
//   return (
//     <>
//       <ApiProvider.Provider
//         value={{
//             API_URL, isLoading, setIsLoading, fetchError, setFetchError, search, setSearch, newItem, setNewItem, items, setItems, addItem, submitHandler, handleClick, handleDelete, delAll
//           }}
//       >
//         {children}
//       </ApiProvider.Provider>
//     </>
//   );
// }
// const useApi = () => {
//   return useContext(ApiProvider);
// };
// export { ApiContext , useApi };

import React, { useEffect, useState } from "react";
import "../../firebase/config";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Create from "./Create";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CreateContext } from "./CreateContext";

const Crud = () => {
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  const outHandler = () => {
    signOut(getAuth()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    try {
      const item = JSON.parse(localStorage.getItem("items"));
      if (item) {
        setData(item);
      }
    } catch (e) {
      console.error("Invalid JSON in localStorage", e);
    }
  }, []);

  function deleteItem(parametr) {
    try {
      let user = JSON.parse(localStorage.getItem("items"));
      const deleteUSer = user.filter((value) => value.key != parametr);
      localStorage.setItem("items", JSON.stringify(deleteUSer));
      setData(deleteUSer);
    } catch (e) {
      console.error("Failed to delete item", e);
    }
  }

  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [age, setAge] = useState("");
  const [edit, setEdit] = useState(null);

  function changeHandler(parametr) {
    setEdit(parametr.key);
    setName(parametr.name);
    setField(parametr.field);
    setAge(parametr.age);
  }

  function saveHandler() {
    if (name && field && age) {
      try {
        const changeData = JSON.parse(localStorage.getItem("items"));
        const updateData = changeData.map(value => value.key == edit ? { ...value, name, field, age } : value);
        localStorage.setItem('items', JSON.stringify(updateData));
        setData(updateData);
        setEdit(null);
      } catch (e) {
        console.error("Failed to save item", e);
      }
    } else {
      document.querySelector('.inp1').classList.add('input-error');
      document.querySelector('.inp2').classList.add('input-error');
      document.querySelector('.inp3').classList.add('input-error');
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  function createHandler() {
    setIsOpen(true);
  }

  function searchHandler(e) {
    let userData = e.target.value;
    if (userData) {
      let findUser = JSON.parse(localStorage.getItem('items'));
      let findOut = findUser.filter(value => value.name.includes(userData));
      setData(findOut);
    } else {
      setData(JSON.parse(localStorage.getItem('items')));
    }
  }

  function sortHandler(e) {
    let sortByName = e.target.value;
    let getByStore = JSON.parse(localStorage.getItem('items'));

    if (sortByName == 'a-z') {
      let sortedName = getByStore.sort((a, b) => a.name.localeCompare(b.name));
      localStorage.setItem('items', JSON.stringify(sortedName));
      setData(sortedName);
    } else {
      let sortedName = getByStore.sort((a, b) => b.name.localeCompare(a.name));
      localStorage.setItem('items', JSON.stringify(sortedName));
      setData(sortedName);
    }
  }

  function filterHandler(e) {
    let filterByField = e.target.value;
    let storedData = JSON.parse(localStorage.getItem('items'));

    if (filterByField) {
      let filteredUsers = storedData.filter(user => user.field === filterByField);
      setData(filteredUsers);
    } else {
      setData(storedData);
    }
  }

  return (
    <div >
      <div>
        <CreateContext.Provider value={{ setIsOpen, setData }}>
          {
            isOpen ? <div className=" w-[100vw] h-[100vh] flex justify-center items-center absolute z-10"> <Create /></div> : null
          }
        </CreateContext.Provider>
      </div>

      <div className="flex justify-end sticky top-0 z-10 bg-[#1D232A]">
        <select onChange={filterHandler} className="select select-success w-44 m-3">
          <option value='frontend'>Frontend</option>
          <option value='backend'>Backend</option>
          <option value='android'>Android</option>
          <option value='ios'>IOS</option>
        </select>

        <select onChange={sortHandler} className="select select-success w-20 m-3">
          <option value='a-z'>A-Z</option>
          <option value='z-a'>Z-A</option>
        </select>

        <label className="input input-bordered flex items-center m-3 gap-2">
          <input type="text" onChange={searchHandler} className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <button onClick={createHandler} className="btn btn-success m-3">Create User</button>
        <button className="btn btn-error m-3" onClick={outHandler}>
          Log Out
        </button>

        <label className="swap swap-rotate m-3">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />

          {/* sun icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>



      <div className={isOpen ? 'blur-sm' : ''}>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="text-[20px]">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Job</th>
                <th>Age</th>
                <th>Remove</th>
                <th>Update</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="text-[18px]">
              {data.map((value, index) => {
                return (
                  <tr key={value.key} className="capitalize">
                    <td>{index + 1}</td>
                    <td>
                      {value.key == edit ? (
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input input-accent inp1 w-[200px]"
                        />
                      ) : (
                        value.name
                      )}
                    </td>
                    <td>
                      {value.key == edit ? (
                        <input
                          value={field}
                          onChange={(e) => setField(e.target.value)}
                          className="input input-accent inp2 w-[200px]"
                        />
                      ) : (
                        value.field
                      )}
                    </td>
                    <td>
                      {value.key == edit ? (
                        <input
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="input input-accent inp3 w-20"
                        />
                      ) : (
                        value.age
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => deleteItem(value.key)}
                        className="btn btn-error text-[16px] text-white"
                      >
                        Delete
                      </button>
                    </td>

                    <td>
                      {value.key == edit ? (
                        <button
                          onClick={saveHandler}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => changeHandler(value)}
                          className="btn btn-success text-[16px] text-white"
                        >
                          Edit
                        </button>
                      )}
                    </td>

                    <td>{value.year}/{value.date}-{value.month}/{value.day} <br /> {value.hour} : {value.minute} AM </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose='1000'
      >
      </ToastContainer>

    </div>
  );
};

export default Crud;

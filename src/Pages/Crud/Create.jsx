import React, { useContext, useState } from "react";
import { CreateContext } from "./CreateContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Create = () => {
    const { setIsOpen, setData } = useContext(CreateContext);
    const [newName, setNewName] = useState("");
    const [newField, setNewField] = useState("");
    const [newAge, setNewAge] = useState("");
    const time = new Date()
    const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday", "Sunday"]
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    console.log(time.getDate());
    console.log(time.getDay());
    console.log(time.getMonth());
    const closeHandler = () => {
        setIsOpen(false);
    };

    const createHandler = () => {
        if (newName && newField && newAge) {
            const newData = JSON.parse(localStorage.getItem("items")) || [];
            let findOut = newData.find(value => value.name == newName && value.field == newField && value.age == newAge)
            if (!findOut) {
                const newUser = {
                    key: newData.length > 0 ? newData[newData.length - 1].key + 1 : 0,
                    name: newName,
                    field: newField,
                    age: newAge,
                    hour: time.getHours(),
                    minute: `${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`,
                    day: dayName[time.getDay() - 1],
                    date: time.getDate(),
                    month: months[time.getMonth()],
                    year: time.getFullYear()
                };

                const updatedData = [...newData, newUser];
                localStorage.setItem("items", JSON.stringify(updatedData));
                setData(updatedData);
                setNewName("");
                setNewField("");
                setNewAge("");
                closeHandler();
            }
            toast.error('Bunday foydalanuvchi mavjud')

        }

    };

    return (
        <div className="modal-box shadow-2xl">
            <form method="dialog">
                <button
                    onClick={closeHandler}
                    className="btn btn-sm  btn-circle btn-ghost absolute right-2 top-2"
                >
                    ✕
                </button>
            </form>
            <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input inp1 input-accent m-2 mt-4 w-full"
            />
            <input
                type="text"
                placeholder="Field"
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                className="input inp2 input-accent m-2 w-full"
            />
            <input
                type="text"
                placeholder="Age"
                value={newAge}
                onChange={(e) => setNewAge(e.target.value)}
                className="input inp3 input-accent m-2 w-full"
            />
            <button onClick={createHandler} className="btn m-2 btn-primary text-[20px] text-white w-full">
                Create
            </button>

            <ToastContainer
                position="top-center"
                autoClose='1000'
            >

            </ToastContainer>
        </div>
    );
};

export default Create;
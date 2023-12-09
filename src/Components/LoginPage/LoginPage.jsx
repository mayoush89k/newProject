import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import "./LoginPage.css";
import Spinner from "../Spinner/Spinner";
import { useUser } from "../../context/UserContext";

export default function LoginPage({setPageHolder }) {
  const form = [
    {
      type: "text",
      placeholder: "Username ",
      value: "",
      error: false,
    },
    {
      type: "password",
      placeholder: "Password ",
      value: "",
      error: false,
    },
  ];
  const { setUser, user} = useUser()
  const { theme } = useTheme();
  const [inputValues, setInputValues] = useState(form);
  const [usersList, setUsersList] = useState([]);
  const usersUrl = "https://6571e97ed61ba6fcc013f0b6.mockapi.io/users";

  const fetchUsers = async () => {
    try {
      const data = await axios.get(usersUrl);
      // console.log(data.data)
      setUsersList(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    const userMatch = usersList.find((user) => {
      return (
        user.username === inputValues[0].value &&
        user.password === inputValues[1].value
      );
    });;
    if (userMatch) {
      // save the user in local storage and also in state to use it afterwords
      setUser(userMatch);
    } else {
      user.username === inputValues[0].value
        ? setInputValues([inputValues[0], { ...inputValues[1], error: true }])
        : setInputValues([{ ...inputValues[0], error: true }, inputValues[1]]);
    }
  };

  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="LoginPage">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* create the inputs as useState list of objects, so we can re-render on page by each value of input  */}
        {inputValues.map((value, index) => (
          <div>
            <input
              key={index}
              type={value.type}
              placeholder={value.placeholder}
              value={value.value}
              onChange={(e) =>
                setInputValues(
                  inputValues.map((value, i) =>
                    i == index
                      ? { ...value, value: e.target.value, error: false }
                      : value
                  )
                )
              }
            />
            {value.error && <p id="error">Wrong {value.placeholder}</p>}
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
      {/* spinner timeout for login time */}
      {user?.username && (
        <div className="spinner">
          login successful
          <Spinner />
          {setTimeout(() => {
            setPageHolder("Vote");
          }, 2000)}
        </div>
      )}
    </div>
  );
}

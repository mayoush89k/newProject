import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./AdminPage.css";
import Chart from "../Chart/Chart";
import axios from "axios";

export default function AdminPage() {
  const { theme } = useTheme();
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

  return (
    <div className={theme ? "pages-light" : "pages-dark"} id="AdminPage">
      <div className="users-list-table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>username</th>
              <th>password</th>
              <th>voted</th>
              <th>admin</th>
            </tr>
          </thead>
          {usersList?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              {user.voted ? <td>yes</td> : <td>no</td>}
              {user.admin ? <td>yes</td> : <td>no</td>}
            </tr>
          ))}
        </table>
      </div>
      <Chart />
    </div>
  );
}

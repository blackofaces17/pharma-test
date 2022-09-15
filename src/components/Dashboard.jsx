import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, listUsers, logOut } from "../utils/user";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [users, setUsers] = useState();

  const navigate = useNavigate();

  const fetchUsers = () => {
    try {
      const usersList = listUsers();
      setUsers(usersList);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    logOut();
    navigate("/login");
  };

  useEffect(() => {
    const authObject = getAuth();
    if (!authObject) navigate("/login");
    else fetchUsers();
  }, []);

  return (
    <div className={styles.dashboard}>
      <header>
        <h3>Welcome</h3>
        <button onClick={logout}>Log Out</button>
      </header>
      {users && (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;

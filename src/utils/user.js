const adminCredentials = {
  userName: "admin",
  password: "admin",
  email: "admin@example.com",
  role: "admin",
};

const register = (data) => {
  const users = localStorage.getItem("users");
  if (users) {
    const storedUser = JSON.parse(users).find(
      (item) => item.email === data.email
    );
    if (storedUser) {
      return Error("User already exists");
    } else {
      localStorage.setItem("users", JSON.stringify([...users, data]));
      localStorage.setItem("auth", JSON.stringify(data));
    }
  } else {
    localStorage.setItem("users", JSON.stringify([data]));
    localStorage.setItem("auth", JSON.stringify(data));
  }
};

const login = ({ userName, password }) => {
  if (
    userName === adminCredentials.userName &&
    password === adminCredentials.password
  ) {
    localStorage.setItem("auth", JSON.stringify({ ...adminCredentials }));
  }

  const users = localStorage.getItem("users");
  if (users) {
    const storedUser = JSON.parse(users).find(
      (item) => item.userName === userName && item.password === password
    );
    if (storedUser) {
      localStorage.setItem("auth", JSON.stringify(storedUser));
    }
  }
  return Error("Invalid credentials");
};

const logOut = () => {
  localStorage.removeItem("auth");
};

const listUsers = () => {
  const auth = getAuth();
  if (auth?.role !== "admin") {
    return Error("Not admin user");
  }

  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const getAuth = () => {
  const auth = localStorage.getItem("auth");
  if (auth) return JSON.parse(auth);
};

export { register, login, logOut, listUsers, getAuth };

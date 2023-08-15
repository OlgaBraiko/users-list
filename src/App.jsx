import { useEffect, useState } from "react";
import "./App.css";
import Users from "./components/Users";

function App() {
  const API = "https://reqres.in/api/users";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <Users items={users} isLoading={isLoading} />
      {/* <Success /> */}
    </div>
  );
}

export default App;

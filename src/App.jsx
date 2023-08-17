import { useEffect, useState } from "react";
import "./App.css";
import Users from "./components/Users";
import Success from "./components/Success";

function App() {
  const API = "https://reqres.in/api/users";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);

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

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  //проверяем есть юзер в массиве id
  const handleInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const handleSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          handleInvite={handleInvite}
          handleSendInvites={handleSendInvites}
        />
      )}
    </div>
  );
}

export default App;

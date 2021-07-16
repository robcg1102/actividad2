import { useEffect, useState } from "react";
import axios from "axios";

import Container from "./Utils/Container";
import Header from "./Components/Header";
import UsersList from "./Components/UsersList";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3004/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  const updateUser = () => {
    axios.get("http://localhost:3004/users").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <div className="App">
      <Container>
        <Header numUsers={users.length} callUpdate={updateUser} />
        {loading ? (
          <p>Cargando</p>
        ) : (
          <UsersList usersList={users} callUpdate={updateUser} />
        )}
      </Container>
    </div>
  );
}

export default App;

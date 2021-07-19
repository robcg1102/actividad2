import { useEffect, useContext } from "react";

import { AppContext } from "./Context";

import Container from "./Utils/Container";
import Header from "./Components/Header";
import UsersList from "./Components/UsersList";

function App() {
  const {state, updateData} = useContext(AppContext);

  useEffect(() => {
    updateData()
  }, []);


  return (
    <div className="App">
      <Container>
        <Header numUsers={state.users.length}/>
        {state.loading ? (
          <p>Cargando</p>
        ) : (
          <div>
            <UsersList usersList={state.users}/>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;

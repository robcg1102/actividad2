import UserRow from "./UserRow";
import Container from "../Utils/Container";

import { useContext } from "react";
import { AppContext } from "../Context";


export default function UsersList() {

  const {state} = useContext(AppContext);

  return (
    <Container paddLR="5px">
      <table>
        <tbody>
          {state.users.map((user) => {
            return <UserRow key={user.id} user={user} />;
          })}
        </tbody>
      </table>
    </Container>
  );
}

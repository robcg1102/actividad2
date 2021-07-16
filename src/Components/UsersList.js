import UserRow from "./UserRow";
import Container from "../Utils/Container";

export default function UsersList(props) {
  const usersList = props.usersList;
  const callUpdate = props.callUpdate;

  const updateData = () => {
    callUpdate();
  }

  return (
    <Container paddLR="5px">
      <table>
        <tbody>
          {usersList.map((user) => {
            return <UserRow key={user.id} user={user} updateUser={updateData}/>;
          })}
        </tbody>
      </table>
    </Container>
  );
}

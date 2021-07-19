import AddUserModal from "./AddUserModal";

export default function Header(props) {

  return (
    <div>
      <h1>User Manager ({props.numUsers})</h1>
      <AddUserModal />
    </div>
  );
}

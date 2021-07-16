import AddUserModal from "./AddUserModal";

export default function Header(props) {

  const callUpdate = props.callUpdate;

  const updateData = ()=>{
    callUpdate()
  }

  return (
    <div>
      <h1>User Manager ({props.numUsers})</h1>
      <AddUserModal callOperation={updateData}/>
    </div>
  );
}

import axios from "axios";

export default function UserRow(props) {
  const user = props.user;
  const updateUser = props.updateUser;
  
  const deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete(`http://localhost:3004/users/${id}`).then(() => {
      updateUser();
    });
  };

  const setActive = (e, id) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3004/users/${id}`, {
        ...user,
        activo: !user.activo,
      })
      .then(() => {
        updateUser();
      });
  };

  return (
    <tr className="rowUser">
      <td className="contentImageUser">
        <img
          src={user.urlImagen}
          alt={user.nombre}
          className={`userImage ${user.activo ? "activo" : "noActivo"}`}
        />
      </td>
      <td>
        <p>{user.nombre}</p>
      </td>
      <td>
        <p>{user.apellido}</p>
      </td>
      <td>
        <p>({user.email})</p>
      </td>
      <td style={{ display: !user.activo ? "none" : "inherit" }}>
        <i className="ri-close-line" onClick={(e) => setActive(e, user.id)}></i>
      </td>
      <td style={{ display: user.activo ? "none" : "inherit" }}>
        <i className="ri-check-fill" onClick={(e) => setActive(e, user.id)}></i>
      </td>
      <td>
        <i
          className="ri-delete-bin-6-fill"
          onClick={(e) => deleteUser(e, user.id)}
        ></i>
      </td>
    </tr>
  );
}

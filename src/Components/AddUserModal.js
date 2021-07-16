import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";

import { useState } from "react";
import { FormControlLabel } from "@material-ui/core";

export default function AddUserModal(props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [activo, setActive] = useState(false);

  const [open, setOpen] = useState(false);

  const [errorForm, setErrorForm] = useState(false);

  const callOperation = props.callOperation;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setUrlImagen("");
    setActive(false);
    setErrorForm(false);
    setOpen(false);
  };

  const createUser = () => {
    const dataUser = { nombre, apellido, email, urlImagen, activo };
    if (!nombre || !apellido || !email || !urlImagen) {
      setErrorForm(true);
      return null;
    }

    axios.post("http://localhost:3004/users", dataUser).then(() => {
      setNombre("");
      setApellido("");
      setEmail("");
      setUrlImagen("");
      setActive(false);
      setOpen(false);
      setErrorForm(false);
      callOperation();
    });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Agregar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Crear usuario</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: errorForm ? "red" : "inherit" }}>
            Es necesario rellenar todos los campos de texto.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required={true}
            fullWidth
          />
          <TextField
            margin="dense"
            id="apellido"
            label="Apellido"
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="Email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            margin="dense"
            id="imagen"
            label="Url Imagen"
            type="text"
            value={urlImagen}
            onChange={(e) => setUrlImagen(e.target.value)}
            required
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                checked={activo}
                onChange={(e) => {
                  setActive(e.target.checked);
                }}
              />
            }
            label="Activo"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={createUser} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

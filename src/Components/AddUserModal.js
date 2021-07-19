import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";

import { useState, useContext } from "react";
import { FormControlLabel } from "@material-ui/core";

import { AppContext } from "../Context";

export default function AddUserModal() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [urlImagen, setUrlImagen] = useState("");
  const [activo, setActive] = useState(false);

  const { updateData } = useContext(AppContext);

  const [open, setOpen] = useState(false);

  const [missingData, setMissingData] = useState(false);
  const [formatEmail, setFormatEmail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNombre("");
    setApellido("");
    setEmail("");
    setUrlImagen("");
    setActive(false);
    setMissingData(false);
    setFormatEmail(false);
    setOpen(false);
  };

  const createUser = () => {
    const dataUser = { nombre, apellido, email, urlImagen, activo };
    if (!nombre || !apellido || !email || !urlImagen) {
      setMissingData(true);
      return null;
    }

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validateEmail = re.test(String(email).toLowerCase());
    if (!validateEmail) {
      setMissingData(false);
      setFormatEmail(true);
      return null;
    }

    axios.post("http://localhost:3004/users", dataUser).then(() => {
      setNombre("");
      setApellido("");
      setEmail("");
      setUrlImagen("");
      setActive(false);
      setOpen(false);
      setMissingData(false);
      setFormatEmail(false);
      updateData();
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
          <DialogContentText
            style={{
              color: missingData ? "red" : "inherit",
              display: missingData ? "inline" : "none",
            }}
          >
            Es necesario rellenar todos los campos de texto.
          </DialogContentText>
          <DialogContentText
            style={{
              color: formatEmail ? "red" : "inherit",
              display: formatEmail ? "inline" : "none",
            }}
          >
            El email es inválido, es necesario que tenga un formato
            ejemplo@correo.com
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

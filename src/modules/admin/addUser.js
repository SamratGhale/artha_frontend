import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { useSnackbar } from "notistack";
import TextField from '@material-ui/core/TextField';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { UserContext } from '../users/context';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditUser = ({ open, handleClose, item }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { updateUser } = useContext(UserContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async () => {
    try {
      await updateUser(item._id, { email,  role });
      enqueueSnackbar("User updated successfully");
      handleClose();
    } catch (err) {
      enqueueSnackbar(err.response.data.message);
    }
  }
  const [roles, setRoles] = useState([]);
  const { getAllRoles } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(()=>{
    setRole(item.role)
    setEmail(item.email)
  },[item])

  useEffect(() => {
    getAllRoles().then((res) => setRoles(res));
  }, [getAllRoles])

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper
          className={classes.paper}
          style={modalStyle}
        >
          <form className={classes.root} autoComplete="off">
            <TextField id="email" value={email} type={"email"} onChange={(e) => { setEmail(e.target.value) }} label="email" variant="outlined" />
            <br></br>
            <FormControl id="role" variant="filled" >
              <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
              <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                {roles.map((role) => {
                  return (
                    <MenuItem key={role.name} value={role.name}>{role.name}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br></br>
            <Button
              onClick={handleLogin}
              variant="contained" color="secondary">
              Edit
            </Button>
          </form>
        </Paper>
      </Modal>
    </div>
  )
}
export default EditUser;
import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { UserContext } from '../../modules/users/context';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    paper: {
        padding: theme.spacing(0),
        width: 210,
        alignContent: 'center',
        color: theme.palette.text.secondary,
    },
}));

const SignUp = ({handleClose , setMessage, setSevernity}) => {
    const classes = useStyles();
    const { addUser } = useContext(UserContext);



    const handleLogin = async () => {
        try {
            await addUser({ email, password, role });
            setMessage("User added successfully");
            setSevernity("success");
            handleClose();
        } catch (err) {
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
        }
    }
    const [roles, setRoles] = useState([]);
    const {getAllRoles} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    useEffect(()=>{
        getAllRoles().then((res)=>setRoles(res));
    },[getAllRoles])

    return (
        <div>
            <Grid
                container
                spacing={0}
                justifyContent="center"
                style={{ minHeight: '10vh' }}
                className={classes.root}
            >
                <form className={classes.root} autoComplete="off">
                    <TextField id = "email" value={email} type={"email"} onChange={(e) => { setEmail(e.target.value) }}  label="email" variant="outlined" />
                    <br></br>
                    <TextField id = "password" value={password} type={"password"} onChange={(e) => { setPassword(e.target.value) }}  label="password" variant="outlined" />
                    <br></br>
                    <FormControl id = "role" className={classes.paper} variant="filled" >
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
                        Sign Up
                    </Button>
                </form>
            </Grid>
        </div>
    )
}
export default SignUp;
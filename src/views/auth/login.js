import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { login } from '../../modules/users/context';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const Login = () => {
    const classes = useStyles();

    const handleLogin=async()=>{
        try{
            await login({email, password});
        }catch(err){
            console.error(err);
        }
    }
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    return (
        <Grid
            container
            spacing={0}
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <form className={classes.root} autoComplete="off">
                <TextField value={email} type={"email"} onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" label="email" variant="outlined" />
                <br></br>
                <TextField value={password} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} id="outlined-basic" label="password" variant="outlined" />
                <br></br>
                <Button
                    onClick={handleLogin}
                    variant="contained" color="secondary">
                    Sign In 
                </Button>
            </form>
        </Grid>
    )
}
export default Login;
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { UserContext } from '../../modules/users/context';
import { ROOTS } from '../../routes/paths';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const Login = ({handleClose, setMessage, setSevernity}) => {
    const classes = useStyles();
    const {userLogin} = useContext(UserContext);
    const history = useHistory();
    const handleLogin=async()=>{
        try{
            await userLogin({email, password});
            setMessage("Login successful");
            setSevernity("success");
            handleClose();
            history.push(ROOTS.app)
        }catch(err){
            setSevernity("error");
            setMessage(err.response.data.message);
            handleClose();
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
                <TextField id="loginemail" value={email} type={"email"} onChange={(e)=>{setEmail(e.target.value)}}  label="email" variant="outlined" />
                <br></br>
                <TextField id = "loginpassword" value={password} type={"password"} onChange={(e)=>{setPassword(e.target.value)}} label="password" variant="outlined" />
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
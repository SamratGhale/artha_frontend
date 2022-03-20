import { Button } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../../modules/users/context";
import { useHistory } from "react-router-dom";

const WaitForApprove = () => {
    const {logout} = useContext(UserContext);

    const history = useHistory();
    const handleClick=()=>{
        logout();
        history.push('/auth/login')
    }
    return (
        <div>
            "The user hasn't been approved by the admin, please wait"
            <br/>
            <Button onClick={handleClick} variant="contained" color="primary">
                Logout
            </Button>
        </div>
    );
}
export default WaitForApprove;
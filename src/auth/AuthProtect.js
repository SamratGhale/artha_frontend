import { Redirect } from "react-router-dom";
import { PATH_APP, PATH_PAGE } from "../routes/paths";
import { getUser } from "../utils/sessionManager";

AuthProtect.propTypes = {
    children: PropTypes.node
};


function AuthProtect({ children, authorizedUsers }) {
    const currentUser = getUser();

    if (!currentUser) {
        return <Redirect to={PATH_PAGE.auth.login} />
    }
    const { roles, is_approved } = currentUser;
    if (!is_approved) {
        return <Redirect to={PATH_PAGE.auth.waitForApprove} />;
    }
    if (authorizedUsers && roles.some((role) => authorizedUsers.includes(role))) {
        return <>{children}</>;
    } else {
        return <Redirect to={PATH_APP.root} />;
    }
}
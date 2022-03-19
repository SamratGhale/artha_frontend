import AuthProtectNav from "../views/auth/AuthProtectNav"
import { ROLES } from "../constants";
import { ROOTS } from "../routes/paths";
import InboxIcon from '@material-ui/icons/MoveToInbox';

const navConfig = [
    //Admin
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        items:[
            {
                title: 'Admin',
                href: ROOTS.admin,
                icon: <InboxIcon/>
            }
        ]
    },
    //App
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.STAFF],
        items:[
            {
                title: 'Home',
                href: ROOTS.app,
                icon: <InboxIcon/>
            }
        ]
    }
]
export default navConfig;
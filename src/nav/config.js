import AuthProtectNav from "../views/auth/AuthProtectNav"
import { ROLES } from "../constants";
import { PATH_APP, ROOTS } from "../routes/paths";
import InboxIcon from '@material-ui/icons/MoveToInbox';

const navConfig = [
    //App
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.STAFF],
        items:[
            {
                title: 'Home',
                href: ROOTS.app,
                icon: <InboxIcon/>
            },
            {
                title: 'Inventory',
                href: PATH_APP.app.inventory,
                icon: <InboxIcon/>
            }
        ]
    },
    //Admin
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN],
        items:[
            {
                title: 'Admin',
                href: ROOTS.admin,
                icon: <InboxIcon/>
            },
            {
                title: 'Add Items',
                href: PATH_APP.admin.inventory,
                icon: <InboxIcon/>
            }

        ]
    },
]
export default navConfig;
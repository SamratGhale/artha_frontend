import AuthProtectNav from "../views/auth/AuthProtectNav"
import { ROLES } from "../constants";
import { PATH_APP, ROOTS } from "../routes/paths";
import ReceiptIcon from '@mui/icons-material/Receipt';
import InsightsIcon from '@mui/icons-material/Insights';
import HomeIcon from '@material-ui/icons/Home'; 
import AddIcon from '@material-ui/icons/Add';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const navConfig = [
    //App
    {
        guard: AuthProtectNav,
        roles: [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.STAFF],
        items:[
            {
                title: 'Home',
                href: ROOTS.app,
                icon: <HomeIcon/>
            },
            {
                title: 'Inventory',
                href: PATH_APP.app.inventory,
                icon: <LocalMallIcon/>
            },
            {
                title: 'Analytics',
                href: PATH_APP.app.analytics,
                icon: <InsightsIcon/>
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
                icon: <SupervisorAccountIcon/>
            },
            {
                title: 'Add Items',
                href: PATH_APP.admin.item_add,
                icon: <AddIcon/>
            },
            {
                title: 'Invoices',
                href: PATH_APP.admin.invoices,
                icon: <ReceiptIcon/>
            }

        ]
    },
]
export default navConfig;
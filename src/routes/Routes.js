import {PATH_APP, ROOTS} from "./paths";
import DashBoardLayout from "../laylouts";
import React from "react";
import Home from '../home';
import ComponentWrapper from '../global/ComponentWrapper';
import { Redirect } from "react-router-dom";
import Admin from '../home/admin'
import AuthProtect from "../global/AuthProtect";
import { ROLES } from "../constants";
import Inventory from "../modules/inventory";
import AdminInventory from "../modules/inventory/admin";

const Routes = {
    path: '*',
    layout: DashBoardLayout,
    routes:[
        {
            exact: true,
            path:ROOTS.admin, 
            heading:'Admin',
            roles:[ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Admin/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            path:ROOTS.app, 
            roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Home/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            path:PATH_APP.app.inventory, 
            roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Inventory/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            path:PATH_APP.admin.inventory, 
            roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <AdminInventory/>
                </ComponentWrapper>
            )
        },
        {
            component: () => <Redirect to="/404" />
        }
    ]
}
export default Routes;
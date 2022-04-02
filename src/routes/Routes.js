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
import AdminInventory from "../modules/admin";
import ItemDetail from "../modules/inventory/items/details/itemDetail";
import AddItems from "../modules/inventory/items/add";

const Routes = {
    path: '*',
    layout: DashBoardLayout,
    routes:[
        {
            exact: true,
            path:PATH_APP.admin.item_add, 
            roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Bulk Upload',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <AddItems/>
                </ComponentWrapper>
            )
        },
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
            path:'/', 
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
            path:PATH_APP.admin.add, 
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
            exact: true,
            path:PATH_APP.app.item_detail, 
            roles:[ROLES.STAFF, ROLES.ADMIN, ROLES.SUPER_ADMIN],
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <ItemDetail {...props}/>
                </ComponentWrapper>
            )
        },
        {
            component: () => <Redirect to="/404" />
        }
    ]
}
export default Routes;
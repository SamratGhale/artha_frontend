import {ROOTS} from "./paths";
import DashBoardLayout from "../laylouts";
import React from "react";
import Home from '../home';
import ComponentWrapper from '../global/ComponentWrapper';
import { Redirect } from "react-router-dom";
import Admin from '../home/admin'
import AuthProtect from "../global/AuthProtect";

const Routes = {
    path: '*',
    layout: DashBoardLayout,
    routes:[
        {
            exact: true,
            path:ROOTS.admin, 
            heading:'Admin',
            guard: AuthProtect,
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Admin/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            path:'/', 
            guard: AuthProtect,
            heading: 'Home',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    <Home/>
                </ComponentWrapper>
            )
        },
        {
            component: () => <Redirect to="/404" />
        }
    ]
}
export default Routes;
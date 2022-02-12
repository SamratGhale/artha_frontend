import {ROOTS} from "./paths";
import DashBoardLayout from "../laylouts";
import React from "react";
import Home from '../home';
import ComponentWrapper from '../global/ComponentWrapper';
import Admin from '../home/admin'

const Routes = {
    path: '/',
    layout: DashBoardLayout,
    routes:[
        {
            exact: true,
            //NOTE(samrat) : Add roles
            //roles: [""] 
            //NOTE(samrat) : Add authprotect
            path:ROOTS.admin, 
            heading:'Admin',
            component : (props)=>(
                <ComponentWrapper {...props}>
                    {' '}
                    <Admin/>
                </ComponentWrapper>
            )
        },
        {
            exact: true,
            //NOTE(samrat) : Add roles
            //roles: [""] 
            //NOTE(samrat) : Add authprotect
            path:ROOTS.app, 
            component : (props)=>(
                <ComponentWrapper {...props}>
                    {' '}
                    <Home/>
                </ComponentWrapper>
            )
        }
    ]
}
export default Routes;
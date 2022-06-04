//Routes and paths 
//Routes are the classes that contains information of the routes
//Paths are just paths to the route
import NProgress from 'nprogress';
import { PATH_APP, PATH_PAGE, ROOTS } from './paths';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';

// import HomeRoutes from './HomeRoutes';
import DefaultAuth from '../global/DefaultProtect';
import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import AppRoutes from './Routes';
import AuthProtect from '../global/AuthProtect';
import DashBoardLayout from '../laylouts';
import ComponentWrapper from '../global/ComponentWrapper';
import LoadingScreen from '../components/LoadingScreen';


const Loadable = (Component) => (props) => {

  return (
    <Suspense
      fallback={
        <LoadingScreen
        sx={{
          ...({
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed',
          })
        }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
//import DefaultAuth from 'src/global/Auth/DefaultProtect';
// ----------------------------------------------------------------------

/*
const nprogressStyle = makeStyles((theme) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, []);

  return <Route {...props} />;
}
*/

export default function Router(){
  return useRoutes([
    {
      path: 'app',
      element:(
        <AuthProtect>
          <DashBoardLayout/>
        </AuthProtect>
      ),
      children:[
        {path: '', element: <Home/>},
        {path: 'items', element: <Inventory/>},
        {path: 'analytics', element: <Analytics/>},
      ]
    },
    {
      path: 'admin',
      element:(
        <AuthProtect>
          <DashBoardLayout/>
        </AuthProtect>
      ),
      children:[
        {element: <Navigate to ="/admin" replace/>},
        {path: '', element: <Admin/>},
        {path: PATH_APP.admin.item_add , element: <AddItems/>},
        {path: 'invoices', element: <Invoices/>},
        {path: 'items/add' , element: <AdminInventory/>},
      ]
    },
    {
      path:'',
      children:[
        { path: PATH_PAGE.auth.login, element:<Auth/>},
        { path: '/404', element:<Page404View/>},
        { path: PATH_PAGE.auth.waitForApprove, element:<WaitForApprove/>},
      ]
    }
  ])
}

/*
export const renderRoutes = (routes = []) => {
  return (
    <Suspense fallback={<Home />} >

      <Switch>
        {routes.map((route, i) => {
          const Component = route.component;
          const Guard = route.guard || DefaultAuth;
          const Layout = route.layout || Fragment;
          //const BreadCrumbs = route.breadcrumbs || [];
          //const Heading = route.heading || '';
          const authorizedUsers = route.roles || [];

          return (
            <RouteProgress
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard authorizedUsers={authorizedUsers}>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component
                        {...props}
                      />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
}

const routes = [
  {
    exact: true,
    path: PATH_PAGE.auth.login,
    component: lazy(() => import('../views/auth'))
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('../views/misc/page404'))
  },
  {
    exact: true,
    path: PATH_PAGE.auth.waitForApprove,
    heading: 'Wait for approve',
    component: lazy(() => import('../views/misc/waitForApprove'))
  },
  AppRoutes,
];
*/

const Admin = Loadable(lazy(()=>import('../modules/admin')));
const Home = Loadable(lazy(()=>import('../home')));
const AddItems      = Loadable(lazy(()=>import('../modules/inventory/items/add')));
const Invoices      = Loadable(lazy(()=>import("../modules/admin/invoices")));
const Inventory     = Loadable(lazy(()=>import('../modules/inventory')));
const AdminInventory= Loadable(lazy(()=>import("../modules/admin")));
const Analytics     = Loadable(lazy(()=>import('../modules/analytics')));
const Auth          = Loadable(lazy(()=>import('../views/auth/index')));
const Page404View   = Loadable(lazy(()=>import('../views/misc/page404')));
const WaitForApprove= Loadable(lazy(()=>import('../views/misc/waitForApprove')));
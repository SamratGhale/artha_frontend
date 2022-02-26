//Routes and paths 
//Routes are the classes that contains information of the routes
//Paths are just paths to the route
import NProgress from 'nprogress';
import { PATH_PAGE } from './paths';
import Home from '../home';
// import HomeRoutes from './HomeRoutes';
import { Switch, Route } from 'react-router-dom';
import DefaultAuth from '../global/DefaultProtect';
import React, { Fragment, useEffect, Suspense, lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppRoutes from './Routes';
//import DefaultAuth from 'src/global/Auth/DefaultProtect';
// ----------------------------------------------------------------------

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
    component: lazy(()=>import('../views/misc/page404'))
  },
  AppRoutes,
];
export default routes;
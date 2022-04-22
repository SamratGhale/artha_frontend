import "./App.css";
import React from 'react'
import { SnackbarProvider } from 'notistack';
import { Router } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from "./routes";
import { UserContextProvider } from "./modules/users/context";
import { InventoryContextProvider } from "./modules/inventory/context";
//import Routes from "./routes/Routes";


const history = createBrowserHistory();
function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <div>
      <SnackbarProvider maxSnack={5}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserContextProvider>
            <InventoryContextProvider>
              <Router history={history}>
                {renderRoutes(routes)}
              </Router>
            </InventoryContextProvider>
          </UserContextProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;

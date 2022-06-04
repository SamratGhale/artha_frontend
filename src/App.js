import "./App.css";
import React from 'react'
import { SnackbarProvider } from 'notistack';
import GlobalStyles from './theme/globalStyles';


import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./modules/users/context";
import { InventoryContextProvider } from "./modules/inventory/context";
import RtlLayout from './components/RtlLayout';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import { HelmetProvider } from 'react-helmet-async';

import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import Router from "./routes";
import ThemeCofig from './theme'
//import Routes from "./routes/Routes";


function App() {

  return (
    <HelmetProvider>
      <ThemeCofig>
        <BrowserRouter>
          <ThemePrimaryColor>
            <RtlLayout>
              <ThemeLocalization>
                <SnackbarProvider maxSnack={5}>
                  <UserContextProvider>
                    <InventoryContextProvider>
                      <GlobalStyles />
                      <BaseOptionChartStyle />
                      <Router />
                    </InventoryContextProvider>
                  </UserContextProvider>
                </SnackbarProvider>
              </ThemeLocalization>
            </RtlLayout>
          </ThemePrimaryColor>
        </BrowserRouter>
      </ThemeCofig>
    </HelmetProvider>
  );
}

export default App;

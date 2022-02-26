import "./App.css";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
import routes, { renderRoutes } from "./routes";
import { UserContextProvider } from "./modules/users/context";
//import Routes from "./routes/Routes";


const history = createBrowserHistory();
function App() {
  return (
    <div>
      <UserContextProvider>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;

import "./App.css";
import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history';
import routes, { renderRoutes } from "./routes";
//import Routes from "./routes/Routes";


const history = createBrowserHistory();
function App() {
  return (
      <div>
        <Router history={history}>
          {renderRoutes(routes)}
        </Router>
      </div>
  );
}

export default App;
